# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index:    GET /products
- Show:     GET /products/:id
- Create [token required]
- [OPTIONAL] Top 5 most popular products:   GET /products/popular
- [OPTIONAL] Products by category (args: product category): GET /products/:category

#### Users
- Index [token required]:   GET /users
- Show [token required]:    GET /users/:id
- Create New?[token required]  POST /users

#### Orders
- Current Order by user (args: user id)[token required] GET /orders/:userid
- [OPTIONAL] Completed Orders by user (args: user id)[token required] GET/orders/completed/:userid

## Data Shapes
#### Product
-  id
- name
- price
- [OPTIONAL] category

TABLE products (id SERIAL PRIMARY KEY, name VARCHAR, price NUMERIC(8,2), category VARCHAR)

#### User
- id
- firstName
- lastName
- password

TABLE users (id SERIAL PRIMARY KEY, first_name VARCHAR, last_name VARCHAR, password VARCHAR)

#### Orders
- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)

TABLE orders (id SERIAL PRIMARY KEY, user_id REFERENCES users(id), status boolean)

TABLE order_lists (order_id REFERENCES orders(id), quantitiy integer, product_id REFERENCES products(id))
