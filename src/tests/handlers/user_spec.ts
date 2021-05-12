import supertest from "supertest";
import app from "../../server";
import { User } from "../../models/user";

const request = supertest(app);

// id is always changing...
// and dropping table doesnt mean deleting its content

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

    it("should delete user John Doe with id 1", async () => {
        const response = await request.delete("/users/1")
            .expect(200);
        
        expect(response.body.id).toEqual(1);
        expect(response.body.first_name).toEqual("Jessica");
    });
});