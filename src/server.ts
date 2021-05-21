import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import user_routes from "./handlers/user";
import product_routes from "./handlers/product";
import order_routes from "./handlers/order";
import order_list_routes from "./handlers/order_list";
import dotenv from "dotenv";

dotenv.config();

const app: express.Application = express()
const address: string = "0.0.0.0:3000"

app.use(express.static(process.env.PROJECT_PATH as string));

app.use(bodyParser.json());

user_routes(app);
product_routes(app);
order_routes(app);
order_list_routes(app);


// app.get('/', function (req: Request, res: Response) {
//     res.send('Hello World!')
// })

app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})

export default app;