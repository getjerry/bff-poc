import {
  defineConfig,
  createRenameTransform,
  createFilterTransform,
} from '@graphql-mesh/compose-cli';
import { loadGrpcSubgraph } from '@omnigraph/grpc';

const renameTransform = createRenameTransform({
  renames: [
    {
      from: {
        type: 'Query',
        field: '^([A-Za-z]+)_([A-Za-z]+)_(.*)$',
      },
      to: {
        type: 'Query',
        field: '$3',
      },
      useRegExpForFields: true,
    },
    {
      from: {
        type: 'Query',
        field: 'Get(.*)',
      },
      to: {
        type: 'Query',
        field: '$1',
      },
      useRegExpForFields: true,
    },
  ],
});

const filterTransform = createFilterTransform({
  rootFieldFilter(typeName, fieldName) {
    if (typeName === 'Query' && fieldName.match(/connectivityState/)) {
      return false;
    }
    return true;
  },
});

export const composeConfig = defineConfig({
  subgraphs: [
    {
      sourceHandler: loadGrpcSubgraph('Profile', {
        endpoint: 'localhost:5001',
      }),
      transforms: [renameTransform, filterTransform],
    },
    {
      sourceHandler: loadGrpcSubgraph('Referral', {
        endpoint: 'localhost:5002',
      }),
      transforms: [renameTransform, filterTransform],
    },
  ],
  additionalTypeDefs: /* GraphQL */ `
    extend type profile__UserProfileResponse {
     referralStats: referral__ReferralStatsResponse
        @resolveTo(
          sourceName: "Referral"
          sourceTypeName: "Query"
          sourceFieldName: "ReferralStats"
          requiredSelectionSet: "{ referralCount }"
          keyField: "userId"
          sourceArgs: { input: { userId: "{root.id}" } }
        )
    }
  `
});
