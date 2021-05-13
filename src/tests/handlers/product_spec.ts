import supertest from "supertest";
import app from "../../server";
import { Product } from "../../models/product";

const request = supertest(app);

describe("testing /products endpoint", () => {

    const banana: Product = {
        name: "Banana",
        price: 5,
        category: "fruit"
    };

    const apple: Product = {
        name: "Apple",
        price: 2,
        category: "fruit"
    }

    let token: string;

    beforeAll(async () => {
        const response = await request.post("/users/login")
            .send({
                first_name: "John",
                last_name: "Doe",
                password: "password"
            });

        token = response.body.token;
    });

    it("should create product Banana", async () => {
        const response = await request.post("/products")
            .send(banana)
            .set("Authorization", "bearer " + token)
            .expect(200);  
        
        expect(response.body.name).toEqual("Banana");

    });

    it("should get product Banana with id 1", async () => {
        const response = await request.get("/products/1")
            .expect(200);

        expect(response.body.id).toEqual(1);
        expect(response.body.name).toEqual("Banana");
    });

    
    it("should edit product Banana to Apple", async () => {
        const response = await request.put("/products/1")
            .send(apple)
            .set("Authorization", "bearer " + token)
            .expect(200);
        
        expect(response.body.id).toEqual(1);
        expect(response.body.name).toEqual("Apple");
    });

    it("should create 2nd Banana and get all", async () => {
        await request.post("/products")
            .send(banana)
            .set("Authorization", "bearer " + token)
            .expect(200);  

        const response = await request.get("/products")
            .expect(200);

        expect(response.body.length).toEqual(2);
        expect(response.body[0].name).toEqual("Apple");
        expect(response.body[1].name).toEqual("Banana");

    });

    it("should delete product Apple with id 1", async () => {
        const response = await request.delete("/products/1")
            .set("Authorization", "bearer " + token)
            .expect(200);
        
        expect(response.body.id).toEqual(1);
        expect(response.body.name).toEqual("Apple");
    });
});