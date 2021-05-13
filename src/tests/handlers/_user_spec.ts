import supertest from "supertest";
import app from "../../server";
import { User } from "../../models/user";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const pepper: string = process.env.BCRYPT_PW as string;

const request = supertest(app);

// should run first! (before order)

describe("testing /users endpoint", () => {

    const johnDoe: User = {
        first_name: "John",
        last_name: "Doe",
        password: "password"
    };

    let tokenJohnDoe: string;
    let tokenJohnDoe2: string;

    const jessicaDoe: User = {
        first_name: "Jessica",
        last_name: "Doe",
        password: "password"
    }

    it("should create user John Doe", async () => {
        const response = await request.post("/users")
            .send(johnDoe)
            .expect(200);  
        
        tokenJohnDoe = response.body.token;
        const decoded: any = jwt.verify(tokenJohnDoe, process.env.TOKEN_SECRET as jwt.Secret);
        expect(decoded.user.first_name).toEqual("John");

    });

    it("should login John Doe", async () => {
        const response = await request.post("/users/login")
            .send(johnDoe)
            .expect(200);  
         
        tokenJohnDoe = response.body.token;
        const decoded: any = jwt.verify(tokenJohnDoe, process.env.TOKEN_SECRET as jwt.Secret);
        expect(decoded.user.first_name).toEqual("John");

    });

    it("should not authenticate John Doe", async () => {
        const response = await request.get("/users/login")
            .send({
                first_name: "John",
                last_name: "Doe",
                password: "notTheRightPassword"
            })
            .expect(400);  
    });

    it("should get user John Doe with id 1", async () => {
        const response = await request.get("/users/1")
            .expect(200);

        expect(response.body.id).toEqual(1);
        expect(response.body.first_name).toEqual("John");
    });

    
    it("should edit user John Doe to Jessica Doe", async () => {
        const response = await request.put("/users/1")
        .send({
            first_name: "Jessica",
            last_name: "Doe",
            password: "password"
        })
        .set('Authorization', 'bearer ' + tokenJohnDoe)
        .expect(200);
        
        expect(response.body.id).toEqual(1);
        expect(response.body.first_name).toEqual("Jessica");
    });

    it("should create 2nd John Doe and get all", async () => {
        let response = await request.post("/users")
            .send(johnDoe)
            .expect(200);  

        tokenJohnDoe2 = response.body.token;

        response = await request.get("/users")
            .expect(200);

        expect(response.body.length).toEqual(2);
        expect(response.body[0].first_name).toEqual("Jessica");
        expect(response.body[1].first_name).toEqual("John");

    });

    it("should not edit 2nd John Doe to Jessica Doe (false token)", async () => {
        const response = await request.put("/users/1")
        .set('Authorization', 'bearer ' + tokenJohnDoe2)
        .send({
            first_name: "Jessica",
            last_name: "Doe",
            password: "password"
        })
        .expect(401);
    });

    it("should not delete user John Doe (token missing)", async () => {
        await request.delete("/users/1")
            .expect(401);
    });

    it("should delete user John Doe with id 1", async () => {
        const response = await request.delete("/users/1")
            .set('Authorization', 'bearer ' + tokenJohnDoe)
            .expect(200);
        
        expect(response.body.id).toEqual(1);
        expect(response.body.first_name).toEqual("Jessica");
    });
});