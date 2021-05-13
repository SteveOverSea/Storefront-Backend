import supertest from "supertest";
import app from "../../server";
import { Order_List } from "../../models/order_list";
import { Order } from "../../models/order";
import { Product } from "../../models/product";


// should run as the last test

const request = supertest(app);

describe("testing /order_lists endpoint", () => {

    const order3: Order = {
        user_id: 3,
        status: false
    };

    const pineapple: Product = {
        name: "Pineapple",
        price: 25,
        category: "fruit"
    }

    let token: string;

    // add order 3 and to orders table .. order_id 2 is inserted in order_test
    // and add pineapple to products, Banana is already inserted in product_test
    beforeAll(async () => {
        const response = await request.post("/users/login")
            .send({
                first_name: "John",
                last_name: "Doe",
                password: "password"
            });

        token = response.body.token;

        await request.post("/orders")
            .set("Authorization", "bearer " + token)
            .send(order3);

        await request.post("/products")
            .set("Authorization", "bearer " + token)
            .send(pineapple);
    });

    const order_list1: Order_List = {
        order_id: 2,
        quantity: 10,
        product_id: 2,
    };

    const order_list2: Order_List = {
        order_id: 3,
        quantity: 250,
        product_id: 3
    }

    it("should have two order in the orders table with id=2 and id=3 and two products with id=2 and 3", async () => {
        const response = await request.get("/orders")
            .expect(200);

        expect(response.body.length).toEqual(2);
        expect(response.body[0].id).toEqual(2);
        expect(response.body[1].id).toEqual(3);
        
        const response2 = await request.get("/products")
            .expect(200);

        expect(response2.body.length).toEqual(2);
        expect(response2.body[0].id).toEqual(2);
        expect(response2.body[1].id).toEqual(3); 
    });

    it("should create order_list for order_id = 2 and product_id=2", async () => {
        const response = await request.post("/order-lists")
            .send(order_list1)
            .set("Authorization", "bearer " + token)
            .expect(200);  
        
        expect(response.body.order_id).toEqual(2);
        expect(response.body.product_id).toEqual(2);
        expect(response.body.quantity).toEqual(10);
    });

    it("should get order_list with id=1", async () => {
        const response = await request.get("/order-lists/1")
            .expect(200);

        expect(response.body.id).toEqual(1);
        expect(response.body.order_id).toEqual(2);
        expect(response.body.product_id).toEqual(2);
        expect(response.body.quantity).toEqual(10);


    });
    
    it("should edit order_list1 to order_list2", async () => {
        const response = await request.put("/order-lists/1")
            .send(order_list2)
            .set("Authorization", "bearer " + token)
            .expect(200);
        
        expect(response.body.id).toEqual(1);
        expect(response.body.order_id).toEqual(3);
        expect(response.body.product_id).toEqual(3);
        expect(response.body.quantity).toEqual(250);
    });

    it("should create 2nd order_list1 and get all", async () => {
        await request.post("/order-lists")
            .send(order_list1)
            .set("Authorization", "bearer " + token)
            .expect(200);  

        const response = await request.get("/order-lists")
            .expect(200);

        expect(response.body.length).toEqual(2);
        expect(response.body[0].order_id).toEqual(3);
        expect(response.body[1].order_id).toEqual(2);

    });

    it("should delete order_list2 with id 1", async () => {
        const response = await request.delete("/order-lists/1")
            .set("Authorization", "bearer " + token)
            .expect(200);
        
        expect(response.body.id).toEqual(1);
        expect(response.body.product_id).toEqual(3);
    });
});