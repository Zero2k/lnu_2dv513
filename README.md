# Database Theory - 2dv513

## Stack:

- NextJS
- TypeScript
- BaseUI
- GraphQL
- TypeORM
- ExpressJS
- PostgresSQL

## Requirements:

- Redis
- Postgres
- NodeJS

## Getting started:

Ensure that you have redis and postgres installed and running.

1. Create a postgres database named: db_project. Username, password and port can be configured in `.env`.
2. If everything is configured correctly, you should be able to start the application using: `yarn dev` or `npm run dev`.
3. Once the application is connected to redis and postgres, you should stop the server and run: `yarn run seed` or `npm run seed` which will create all product categories and some default products.
4. Start the application after executing the seed command.
5. Visist [localhost:3000](http://localhost:3000) to access the application.

## Account:

The seed command / file create a test user which you can use to login and test the application:

Username: test@test.com
Password: test@test.com

## GraphQL

Visit [localhost:3000/graphql](http://localhost:3000/graphql) to access GraphQL Playground and view all available queries, mutations and types.
