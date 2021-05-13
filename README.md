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
