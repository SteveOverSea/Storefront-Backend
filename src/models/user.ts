import Client from "../database";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();
const pepper: string = process.env.BCRYPT_PW as string;
const saltRounds: number = parseInt(process.env.SALT_ROUNDS as string);

export type User = {
    id?: number,
    first_name: string,
    last_name: string,
    password: string,
    token?: string
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
            
            const hashedPW = bcrypt.hashSync(u.password + pepper, saltRounds);

            const result = await conn
                .query(sql, [u.first_name, u.last_name, hashedPW]);
            
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

    async authenticate(loginUser: User): Promise<User | null> {
        try {
            const conn = await Client.connect();
            const sql = `SELECT password FROM users WHERE first_name = $1 AND last_name = $2;`;

            const result = await conn.query(sql, [loginUser.first_name, loginUser.last_name]);

            if (result.rows.length > 0) {
                const user = result.rows[0];
                
                if (bcrypt.compareSync(loginUser.password + pepper, user.password)) {
                    return loginUser;
                }
            }

            return null;

        } catch (err) {
            throw new Error(`Could not authenticate user ${loginUser.first_name} ${loginUser.last_name}. Error: ${err}`)
        }
    }
  }