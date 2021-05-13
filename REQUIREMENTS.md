# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index                     GET /products
- Show                      GET /products/:id
- Create [token required]   POST /products
- Update [token required]   PUT /products/:id
- Delete [token required]   DELETE /products/:id


#### Users
- Index                         GET /users
- Show                          GET /users/:id
- Create                        POST /users
- Update [token required]       PUT /users/:id
- Delete [token required]       DELETE /users/:id
- Login                         POST /users/login

#### Orders
- Index                         GET /orders
- Show                          GET /orders/:id
- Create [token required]       POST /orders
- Update [token required]       PUT /orders/:id
- Delete [token required]       DELETE /orders/:id

#### Users
- Index                         GET /order-lists
- Show                          GET /order-lists/:id
- Create [token required]       POST /order-lists
- Update [token required]       PUT /order-lists/:id
- Delete [token required]       DELETE /order-lists/:id
- Login                         POST /order-lists/login

## Data Shapes
#### Product
- id
- name
- price
- category

CREATE TABLE products (id SERIAL PRIMARY KEY, name VARCHAR, price NUMERIC(8,2), category VARCHAR)

#### User
- id
- firstName
- lastName
- password

CREATE TABLE users (id SERIAL PRIMARY KEY, first_name VARCHAR, last_name VARCHAR, password VARCHAR)

#### Orders
- id
- user_id
- status of order (active or complete)

CREATE TABLE orders (id SERIAL PRIMARY KEY, user_id REFERENCES users(id), status boolean)

#### Order_Lists
- id
- id of product in order
- quantity of product
- id of the order

CREATE TABLE order_lists (id SERIAL PRIMARY KEY, order_id REFERENCES orders(id), quantity integer, product_id REFERENCES products(id))
