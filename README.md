# SERVER TEMPLATE

ORing Cloud Backend Server Repository Template

## Development

```sh
npm run start:dev:docker
```

## Deployment

1. Run `cp .env.example .env.prod`
2. Edit `.env.prod` file
3. Run `npm run start:prod:docker`

## Generate a migration

```sh
npx typeorm migration:create -n MyMigration -d src/migrations`
```

## Specification

- [Git](./docs/specification/git.md)

- [PostgreSQL](./docs/specification/postgres.md)

- [Develop](./docs/specification/develop.md)