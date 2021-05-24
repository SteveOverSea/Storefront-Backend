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

### PostgreSQL

Make sure that you habe PostgreSQL installed, otherwise install [PostgreSQL](https://www.postgresql.org) from their homepage.

```
postgres --version
```

Start Postgres with

```
(sudo) su - postgres
```

and enter the Postgres terminal with

```
psql postgres
```

(you have to enter your superuser and postgres password)

Create the database

```
CREATE DATABASE <db_name>;
```

Create a user and grant access to this database

```
CREATE USER <user_name> WITH PASSWORD '<password>';

GRANT ALL PRIVILEGES ON DATABASE <db_name> TO <user_name>;
```

Connect to the database

```
\c <db_name>
```

Display the tables (no relations should be found)

```
\dt
```

Now that you can create a database and a user, you should create one database (with a user) for production and one database (with a user - you can use the same as for the dev db) for testing.

The project will work with your database if you name your environment variables in the .env file (from [dotenv](https://www.npmjs.com/package/dotenv)) accordingly:

```
DB_HOST = "<where you DB is hosted (for development usually localhost)>"
DB_NAME = "<db_name>"
DB_USER = "<user_name>"
DB_PASSWORD = "<password>"
TEST_DB_NAME = "<db_name>" (for tests)
```

Other environment variables that are necessary

```
ENV = "dev" (decided to run with dev db or test db)
BCRYPT_PW = "<write some string to pepper your encryption>"
SALT_ROUNDS = "<write an integer to say how many times the pw should be hashed>"
TOKEN_SECRET = "<write a string for the JWT secret>"
PROJECT_PATH = "<path to your served project>"
```

Install the node modules

```
npm install
```

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

The server runs on localhost:3000 on default.

## Routes and Database Schemas

Show and Index routes never require a token.
Create, Update and Delete routes usually do.

### /users

The user consists out of
- id 
- first_name
- last_name
- password
- recentPurchases (optional)

Creating the user doesn't need a token.
You can login with your credentials on /users/login

The passwords gets hashed with bcrypt.

On the Show route (GET users/:id) you also get recentPurchases back, an array of max. 5 Products the user recently ordered.

### /products

The product consists out of
- id
- name
- price
- category

The usual CRUD routes are implemented, you need a user token for all manipulating routes.

### /orders

The order consists out of
- id
- user_id
- status
  
The order stores orders connected to a specific users and saves the current status (active or finished).
The usual CRUD routes are implemented, you need a user token for all manipulating routes.

### /order_lists
The order consists out of
- id
- order_id
- quantity
- product_id
  
The order_lists stores the products and quantity connected to a specific order.
The usual CRUD routes are implemented, you need a user token for all manipulating routes.
