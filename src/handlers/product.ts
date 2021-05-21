import express from "express";
import { Product, Products } from "../models/product";
import verifyAuthToken from "../middleware/verifyAuthToken";

const productStore = new Products();

const index = async (req: express.Request, res: express.Response) => {
    try {
        const products = await productStore.index();
        res.send(products);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const show = async (req: express.Request, res: express.Response) => {
    try {
        const product = await productStore.show(req.params.id);
        res.send(product);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const create = async (req: express.Request, res: express.Response) => {
    try {
        const product: Product = {
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            url: req.body.url
        };

        const newProduct = await productStore.create(product);
        res.send(newProduct);

    } catch (error) {
        res.status(400);
        res.send(error.message);
    }

}

const edit = async (req: express.Request, res: express.Response) => {
    try {
        const product: Product = {
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            url: req.body.url
        };

        const updatedProduct = await productStore.update(req.params.id, product);
        res.send(updatedProduct);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const destroy = async (req: express.Request, res: express.Response) => {
    try {
        const deleted = await productStore.delete(req.params.id);
        res.send(deleted);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const product_routes = (app: express.Application) => {
    app.get("/products", index);
    app.get("/products/:id", show);
    app.post("/products", verifyAuthToken, create);
    app.put("/products/:id", verifyAuthToken, edit);
    app.delete("/products/:id", verifyAuthToken, destroy);
};

export default product_routes;