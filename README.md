## Description

This project is a NestJS-based backend application designed to manage and process Star Wars API (SWAPI) data,
storing it in a structured database. It includes data parsing, migration handling, and relationship mapping to efficiently organize and query Star Wars universe entities such as
films, characters, planets, species, starships, and vehicles.

The system supports AWS S3 integration for storage, uses environment variables for configuration, and offers a seeding mechanism to populate and structure the database with external data sources.
It is built with TypeScript, TypeORM, and MySQL, making it a scalable and maintainable solution.

## Features
- Swagger Documentation
- JWT Authentication
- Black List
- White List
- AWS S3
- Docker Compose
- CASL Access Control
- Exception Filters

## Installation

```bash
$ npm install
```

## Insert info of Database, AWS s3 bucket and Secrets into .env file 

## Docker initialization

```bash
$ docker-compose up -d
```
## Create a tabels

```bash
# generate migration
$ npm run migration:generate

# create all tabels
$ npm run re-migrate
```

## Fill database

```bash
# parse all data
$ npm run seed:pack

# build relations between them
$ npm run seed:build
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
