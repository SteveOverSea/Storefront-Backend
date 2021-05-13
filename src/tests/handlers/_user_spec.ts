import supertest from "supertest";
import app from "../../server";
import { User } from "../../models/user";

const request = supertest(app);

// should run first! (before order)

describe("testing /users endpoint", () => {

    const johnDoe: User = {
        first_name: "John",
        last_name: "Doe",
        password: "password"
    };

    const jessicaDoe: User = {
        first_name: "Jessica",
        last_name: johnDoe.last_name,
        password: johnDoe.password
    }

    it("should create user John Doe", async () => {
        const response = await request.post("/users")
            .send(johnDoe)
            .expect(200);  
        
        expect(response.body.first_name).toEqual("John");

    });

    it("should get user John Doe with id 1", async () => {
        const response = await request.get("/users/1")
            .expect(200);

        expect(response.body.id).toEqual(1);
        expect(response.body.first_name).toEqual("John");
    });

    
    it("should edit user John Doe to Jessica Doe", async () => {
        const response = await request.put("/users/1")
        .send(jessicaDoe)
        .expect(200);
        
        expect(response.body.id).toEqual(1);
        expect(response.body.first_name).toEqual("Jessica");
    });

    it("should create 2nd John Doe and get all", async () => {
        await request.post("/users")
            .send(johnDoe)
            .expect(200);  

        const response = await request.get("/users")
            .expect(200);

        expect(response.body.length).toEqual(2);
        expect(response.body[0].first_name).toEqual("Jessica");
        expect(response.body[1].first_name).toEqual("John");

    });

    it("should delete user John Doe with id 1", async () => {
        const response = await request.delete("/users/1")
            .expect(200);
        
        expect(response.body.id).toEqual(1);
        expect(response.body.first_name).toEqual("Jessica");
    });
});