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
typeorm migration:create -n MyMigration -d src/migrations`
```

## Specification

-   [Git](./docs/specification/git.md)

-   [PostgreSQL](./docs/specification/postgres.md)

-   [Develop](./docs/specification/develop.md)

---

## API Document

-   Postman

```
Please puts  postman json file and environment file at folder (./docs/postman).
```

If there is some api information needs to illustrate , please write at
[Here](./docs/postman/postman.md)

-   Swagger

```
Swagger api document web has init at url : {{server host}}/api/document
```
