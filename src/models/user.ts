import Client from "../database";

export type User = {
    id?: number,
    first_name: string,
    last_name: string,
    password: string
};

export class Users {
    async index(): Promise<User[]> {
        try {
            const conn = await Client.connect();
            const sql = 'SELECT * FROM users;';

            const result = await conn.query(sql);

            conn.release();
            return result.rows; 
        } catch (err) {
            throw new Error(`Could not get users. Error: ${err}`)
        }
    }
  
    async show(id: string): Promise<User> {
        try {
            const conn = await Client.connect();
            const sql = `SELECT * FROM users WHERE id=${id};`;

            const result = await conn.query(sql);

            conn.release()
            return result.rows[0]
        } catch (err) {
            throw new Error(`Could not find user ${id}. Error: ${err}`)
        }
    }
  
    async create(u: User): Promise<User> {
        try {
            const conn = await Client.connect();
            const sql = 'INSERT INTO users (first_name, last_name, password) VALUES($1, $2, $3) RETURNING *;';
            
            const result = await conn
                .query(sql, [u.first_name, u.last_name, u.password]);
            
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not add new user ${u.first_name} ${u.last_name} . Error: ${err}`);
        }
    }

    async update(id: string, u: User): Promise<User> {
        try {
            const conn = await Client.connect();
            const sql = `UPDATE users SET first_name = $1, last_name= $2 , password= $3 WHERE id=${id} RETURNING *;`;

            const result = await conn
                .query(sql, [u.first_name, u.last_name, u.password]);

            conn.release();
            console.log(result.rows);
            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not update user ${u.id}. Error: ${err}`);
        }
    }
  
    async delete(id: string): Promise<User> {
        try {
            const conn = await Client.connect();
            const sql = `DELETE FROM users WHERE id=${id} RETURNING *;`;
  
            const result = await conn.query(sql);
  
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not delete user ${id}. Error: ${err}`)
        }
    }
  }