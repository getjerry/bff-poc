# BFF proof of concept repository

It contains 2 gRPC microservices and a gateway.

Start with 

```bash
npx nx run referral:serve
npx nx run profile:serve
npx nx run gateway:serve
```

Then federated graphql api will be available at `http://localhost:4000/graphql`

You can test it with this query:

```graphql
{
  UserProfile(input: { id: "610db576-60da-4b12-b975-21bcf47ad6c3"}) {
    id
    name
    age
    referralStats {
      referralCount
    }
  }
}
```

id, name and age comes from profile service and referralStats - from referral service
