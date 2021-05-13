# Storefront Backend Project

This project is part of the Udacity Full Stack JavaScript Nanodegree.
The task was to implement a API for a FrontEnd Application describend in REQUIREMENTS.md

It should showcase following functionality:

- setting up postgreSQL database in Node.js
- up/down migrations with db-migrate
- handling the structure between database models, route handlers and http verbs
- follwing a test driven development approach with jasmine and supertest
- password hashin with bcrypt
- json web tokens for protecting routes (JWT)

## Setup

Install the node modules

```
npm install
```

Make sure to have postgreSQL installed on your local pc, so that it can serve as your localhost database

Load the database schema with

```
db-migrate up
```

Run the test suite with 

```
npm run test-up
```

and afterwards reset the test-database with

```
npm run test-down
```

you can start this API with

```
npm run start
```

## Routes and Database Schemas

### /users

### /products

### /orders

### /order_lists
