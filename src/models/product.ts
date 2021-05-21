import Client from "../database";

export type Product = {
    id?: number,
    name: string,
    price: number,
    description: string,
    url: string,
    quantity?: number
};

export class Products {
    async index(): Promise<Product[]> {
        try {
            const conn = await Client.connect();
            const sql = 'SELECT * FROM products;';

            const result = await conn.query(sql);

            conn.release();
            return result.rows; 
        } catch (err) {
            throw new Error(`Could not get products. Error: ${err}`)
        }
    }
  
    async show(id: string): Promise<Product> {
        try {
            const conn = await Client.connect();
            const sql = `SELECT * FROM products WHERE id=${id};`;

            const result = await conn.query(sql);

            conn.release()
            return result.rows[0]
        } catch (err) {
            throw new Error(`Could not find product ${id}. Error: ${err}`)
        }
    }
  
    async create(p: Product): Promise<Product> {
        try {
            const conn = await Client.connect();
            const sql = 'INSERT INTO products (name, price, description, url) VALUES($1, $2, $3, $4) RETURNING *;';
            
            const result = await conn
                .query(sql, [p.name, p.price, p.description, p.url]);
            
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not add new product ${p.name}. Error: ${err}`);
        }
    }

    async update(id: string, p: Product): Promise<Product> {
        try {
            const conn = await Client.connect();
            const sql = `UPDATE products SET name = $1, price = $2 , description = $3, url = $4 WHERE id=${id} RETURNING *;`;

            const result = await conn
                .query(sql, [p.name, p.price, p.description, p.url]);

            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not update product ${p.id}. Error: ${err}`);
        }
    }
  
    async delete(id: string): Promise<Product> {
        try {
            const conn = await Client.connect();
            const sql = `DELETE FROM products WHERE id=${id} RETURNING *;`;
  
            const result = await conn.query(sql);
  
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not delete product ${id}. Error: ${err}`)
        }
    }
  }