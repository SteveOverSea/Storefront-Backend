import supertest from "supertest";
import app from "../../server";
import { Order } from "../../models/order";
import { User } from "../../models/user";


const request = supertest(app);

describe("testing /orders endpoint", () => {

    let tokenID2: string;
    let tokenID3: string;

    const user1: User = {
        first_name: "Jessica",
        last_name: "Doe",
        password: "password"
    };

    // add user_id 3 to users table .. user_id 2 is inserted in user_test get tokens
    beforeAll(async () => {
        let response = await request.post("/users")
            .send(user1);

        tokenID3 = response.body.token;

        response = await request.post("/users/login")
            .send({
                first_name: "John",
                last_name: "Doe",
                password: "password"
            });
        
        tokenID2 = response.body.token;
    });

    const order1: Order = {
        user_id: 2,
        status: false
    };

    const order2: Order = {
        user_id: 3,
        status: true
    }

    it("should have two users in the users table with id=2 and id=3", async () => {
        const response = await request.get("/users")
            .expect(200);

        expect(response.body.length).toEqual(2);
        expect(response.body[0].id).toEqual(2);
        expect(response.body[1].id).toEqual(3);      
    });

    it("should create unfinished order for user_id 2", async () => {
        const response = await request.post("/orders")
            .send(order1)
            .set('Authorization', 'bearer ' + tokenID2)
            .expect(200);  
        
        expect(response.body.user_id).toEqual(2);

    });

    it("should get order with user_id with id 1", async () => {
        const response = await request.get("/orders/1")
            .expect(200);

        expect(response.body.id).toEqual(1);
        expect(response.body.user_id).toEqual(2);
    });

    
    it("should edit unfinished order1 to finished order2", async () => {
        const response = await request.put("/orders/1")
            .send(order2)
            .set('Authorization', 'bearer ' + tokenID3)
            .expect(200);
        
        expect(response.body.id).toEqual(1);
        expect(response.body.status).toEqual(true);
    });

    it("should create 2nd order1 and get all", async () => {
        await request.post("/orders")
            .send(order1)
            .set('Authorization', 'bearer ' + tokenID2)
            .expect(200);  

        const response = await request.get("/orders")
            .expect(200);

        expect(response.body.length).toEqual(2);
        expect(response.body[0].user_id).toEqual(3);
        expect(response.body[1].user_id).toEqual(2);

    });

    it("should delete order2 with id 1", async () => {
        const response = await request.delete("/orders/1")
            .set('Authorization', 'bearer ' + tokenID3)
            .expect(200);
        
        expect(response.body.id).toEqual(1);
        expect(response.body.user_id).toEqual(3);
    });
});