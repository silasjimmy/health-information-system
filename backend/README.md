# Health system backend application

The backend application is developed using [NestJS](https://nestjs.com/) with [TypeORM](). The application exposes a REST API endpoint for consumption by external applications.

## Features

- [Typescript]() for logic implementation
- [PostgresSQL]() database for storing and managing information
- [Swagger](https://docs.nestjs.com/openapi/introduction) for API documentation

## Setup

### Development

1. Create a postgres database locally or remotely, e.g using AWS RDS

2. In the `application-src` folder, create a `.env` file and set the following environment variables:

```sh
DATABASE_HOST=<your database host; localhost if local, provide a url if remote>
DATABASE_PORT=<your database port; postgres default is 5432>
DATABASE_USERNAME=<your database username>
DATABASE_PASSWORD=<your database password>
DATABASE_NAME=<your database name>
DATABASE_SYNCRONIZE=<true to update database everytime there are changes, false otherwise>
DATABASE_LOGGING=<true to log database operations, false otherwise>
APP_PORT=<port number the app shoul listen to; default 3000>
```

### Deployment
