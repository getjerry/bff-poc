import { defineConfig } from '@graphql-hive/gateway';

export const gatewayConfig = defineConfig({
  port: 4000,
  host: '0.0.0.0',
  cors: {
    origin: '*',
    credentials: true,
  },
  graphiql: true,
  maskedErrors: false,
});
