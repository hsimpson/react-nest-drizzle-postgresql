# react-nest-drizzle-postgresql

This is a full-stack application built with React, NestJS, Drizzle ORM, and PostgreSQL. It serves as a boilerplate for building modern web applications with a focus on type safety and developer experience.

## Features

### Database: PostgreSQL for data storage

### ORM: Drizzle ORM for database interactions

### Backend: NestJS for building the server-side application

### Frontend: React for building the client-side application

## Installation

Prerequisites:

- Node.js (v22 or later)
- Docker (for PostgreSQL)
- Yarn (for package management)

### Install the packages with Yarn

```shell
yarn install
```

### Create an environment for the backend

Copy the `.env.example` file to `.env` and update the values as needed.
To create the JWT secrets run the following command:

```shell
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```
