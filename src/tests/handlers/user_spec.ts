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
    }

    it("should create user John Doe", async () => {
        const response = await request.post("/users")
            .send(johnDoe)
            .expect(200);  
            
        console.log(response.body);
        
        expect(response.body.first_name).toEqual("John");

    });

    it("should get user John Doe with id 1", async () => {
        const response = await request.get("/users/1")
            .expect(200);

        expect(response.body.id).toEqual(1);
    });

    it("should delete user John Doe with id 1", async () => {
        const response = await request.delete("/users/1")
            .expect(200);
        
        expect(response.body.id).toEqual(1);

    });
});