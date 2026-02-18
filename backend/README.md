# Health Management System REST API

The REST API is developed using [NestJS](https://nestjs.com/) with [TypeORM](https://typeorm.io/). The application exposes several endpoints for consumption by an external application.

## Tools

- [Typescript](https://www.typescriptlang.org/) for logic implementation
- [PostgresSQL](https://www.postgresql.org/) database for storing and managing information

## Features

### Security

- Authentication
- Authorization
- Encryption & Hashing
- CORS
- Rate Limiting

### Others

- Interactive documentation using [Swagger](https://docs.nestjs.com/openapi/introduction)
- Data validation using Data Transfer Objects (DTOs)
- Versioning

## Setup

### Development

1. Create a local Postgres database in your computer or a remote database, e.g using AWS RDS

2. In the `application-src` folder, create a `.env` file and set the following environment variables:

```sh
DATABASE_HOST=<your database host; localhost if local, provide a url if remote>
DATABASE_PORT=<your database port; postgres default is 5432>
DATABASE_USERNAME=<your database username>
DATABASE_PASSWORD=<your database password>
DATABASE_NAME=<your database name>
DATABASE_SYNCRONIZE=<true to update database everytime there are changes, false otherwise>
DATABASE_LOGGING=<true to log database operations, false otherwise>
APP_PORT=<port number the app should listen to; default 3000>
JWT_SECRET=<a secret to use when minting and verifying user access tokens>
```

> For an easy and faster setup, use the values provided in the [.env.example](https://github.com/silasjimmy/health-information-system/blob/development/backend/.env.example) file.

2. Navigate to the `application-src` folder

3. Install dependencies

```sh
npm run install
```

4. Start the development server

```sh
npm run start:dev
```

5. From the logs, click the Swagger API [url](http://localhost:3000/api#/) to view and test the provided endpoints

6. The current API version is [v1](http://localhost:3000/v1)



<!-- ## Prototype

1. Images

<p align="center">
  <a href="https://github.com/silasjimmy/health-information-system/blob/development/backend/backend-service-running.png" target="blank"><img src="https://github.com/silasjimmy/health-information-system/blob/development/backend/backend-service-running.png" width="500" alt="Backend service start" /></a>
</p>

<p align="center">
  <a href="https://github.com/silasjimmy/health-information-system/blob/development/backend/backend-swagger-ui.png" target="blank"><img src="https://github.com/silasjimmy/health-information-system/blob/development/backend/backend-swagger-ui.png" width="500" alt="Backend service UI" /></a>
</p>

2. Demo

Use this [link](https://youtu.be/7nuuTnahrHw) to view the REST API service demo. -->

## Deployment

The service is not deployed yet. However, you can utilize the deployed Postgres database in AWS RDS using the credentials provided in the [.env.example](https://github.com/silasjimmy/health-information-system/blob/development/backend/.env.example) file.
