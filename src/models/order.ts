import Client from "../database";

export type Order = {
    id: number,
    user_id: number,
    status: boolean
};

export class Orders {
    async index(): Promise<Order[]> {
        try {
            const conn = await Client.connect();
            const sql = 'SELECT * FROM orders';

            const result = await conn.query(sql);

            conn.release();
            return result.rows; 
        } catch (err) {
            throw new Error(`Could not get orders. Error: ${err}`)
        }
    }
  
    async show(id: string): Promise<Order> {
        try {
            const conn = await Client.connect();
            const sql = `SELECT * FROM orders WHERE id=${id}`;

            const result = await conn.query(sql);

            conn.release()
            return result.rows[0]
        } catch (err) {
            throw new Error(`Could not find order ${id}. Error: ${err}`)
        }
    }
  
    async create(o: Order): Promise<Order> {
        try {
            const conn = await Client.connect();
            const sql = 'INSERT INTO order (user_id, status) VALUES($1, $2) RETURNING *';
            
            const result = await conn
                .query(sql, [o.user_id, o.status]);
            
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not add new order from user ${o.user_id}. Error: ${err}`);
        }
    }
  
    async delete(id: string): Promise<Order> {
        try {
            const conn = await Client.connect();
            const sql = `DELETE FROM orders WHERE id=${id}`;
  
            const result = await conn.query(sql);
  
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not delete order ${id}. Error: ${err}`)
        }
    }
  }