import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();

const {
    DB_HOST,
    DB_NAME,
    TEST_DB_NAME,
    DB_USER,
    DB_PASSWORD,
    ENV
} = process.env;

let Client: Pool;

console.log(ENV);

if (ENV === "dev") {
    Client = new Pool({
        host: DB_HOST,
        database: DB_NAME,
        user: DB_USER,
        password: DB_PASSWORD
    });
} else if (ENV === "test") {
    Client = new Pool({
        host: DB_HOST,
        database: TEST_DB_NAME,
        user: DB_USER,
        password: DB_PASSWORD
    });
} else {
    Client = new Pool();
}

export default Client;