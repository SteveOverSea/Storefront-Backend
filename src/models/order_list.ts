import Client from "../database";

// needs more customization - not a default model class

export type Order_List = {
    id?: number,
    order_id: number,
    quantity: number,
    product_id: number
}

export class Order_Lists {
    async index(): Promise<Order_List[]> {
        try {
            const conn = await Client.connect();
            const sql = 'SELECT * FROM order_lists;';

            const result = await conn.query(sql);

            conn.release();
            return result.rows; 
        } catch (err) {
            throw new Error(`Could not get order_lists. Error: ${err}`)
        }
    }
  
    async show(id: string): Promise<Order_List> {
        try {
            const conn = await Client.connect();
            const sql = `SELECT * FROM order_lists WHERE id=${id};`;

            const result = await conn.query(sql);

            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not find order_list id ${id}. Error: ${err}`)
        }
    }
  
    async create(ol: Order_List): Promise<Order_List> {
        try {
            const conn = await Client.connect();
            const sql = 'INSERT INTO order_lists (order_id, quantity, product_id) VALUES($1, $2, $3) RETURNING *;';
            
            const result = await conn
                .query(sql, [ol.order_id, ol.quantity, ol.product_id]);
            
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not add new order_list from order ${ol.order_id}. Error: ${err}`);
        }
    }

    async update(id: string, ol: Order_List): Promise<Order_List> {
        try {
            const conn = await Client.connect();
            const sql = `UPDATE order_lists SET order_id = $1, quantity = $2, product_id = $3 WHERE id=${id} RETURNING *;`;

            const result = await conn
                .query(sql, [ol.order_id, ol.quantity, ol.product_id]);

            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not update order_list id ${ol.id}. Error: ${err}`);
        }
    }
  
    async delete(id: string): Promise<Order_List> {
        try {
            const conn = await Client.connect();
            const sql = `DELETE FROM order_lists WHERE id=${id} RETURNING *;`;
  
            const result = await conn.query(sql);
  
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not delete order_list with id ${id}. Error: ${err}`)
        }
    }

    async getAllOrders(id: string): Promise<any> {
        try {
            const conn = await Client.connect();
            const sql = `SELECT order_id, name, price, quantity, status FROM orders INNER JOIN order_lists ON id(orders)=order_id INNER JOIN products ON product_id=id(products) INNER JOIN users ON user_id=id(users) WHERE user_id=${id};`
           
            const result = await conn.query(sql);

            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error("Could not get all order from " + id);
        }
    }
  }