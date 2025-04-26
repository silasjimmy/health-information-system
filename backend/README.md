# Health system backend application

The backend application is developed using [NestJS](https://nestjs.com/) with [TypeORM](https://typeorm.io/). The application exposes a REST API endpoint for consumption by external applications.

## Features

- [Typescript](https://www.typescriptlang.org/) for logic implementation
- [PostgresSQL](https://www.postgresql.org/) database for storing and managing information
- [Swagger](https://docs.nestjs.com/openapi/introduction) for API documentation

## Setup

### Development

1. Create a local Postgres database in your computer

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
JWT_SECRET=<a secret to use when minting and verifying user access tokens>
```

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

## Prototype

1. Images

![Backend service start](http://url/to/img.png) 

![Backend service UI](http://url/to/img.png) 

2. Demo

Use this [link](https://youtu.be/7nuuTnahrHw) to view the backend service demo.