import express from "express";
import { Order, Orders } from "../models/order";
import verifyAuthToken from "../middleware/verifyAuthToken";

const orderStore = new Orders();

// TODO: let orders only be seen/edited by users that own them

const index = async (req: express.Request, res: express.Response) => {
    try {
        const orders = await orderStore.index();
        res.send(orders);
    } catch (error) {
        res.status(400).send(error);
    }
};

const show = async (req: express.Request, res: express.Response) => {
    try {
        const order = await orderStore.show(req.params.id);
        res.send(order);
    } catch (error) {
        res.status(400).send(error);
    }
}

const create = async (req: express.Request, res: express.Response) => {
    try {
        const order: Order = {
            user_id: req.body.user_id,
            status: req.body.status
        };

        const newOrder = await orderStore.create(order);
        res.send(newOrder);

    } catch (error) {
        res.status(400);
        res.send(error);
    }

}

const edit = async (req: express.Request, res: express.Response) => {
    try {
        const order: Order = {
            user_id: req.body.user_id,
            status: req.body.status
        };

        const updatedOrder = await orderStore.update(req.params.id, order);
        res.send(updatedOrder);
    } catch (error) {
        res.status(400).send(error);
    }
}

const destroy = async (req: express.Request, res: express.Response) => {
    try {
        const deleted = await orderStore.delete(req.params.id);
        res.send(deleted);
    } catch (error) {
        res.status(400).send(error);
    }
}

const order_routes = (app: express.Application) => {
    app.get("/orders", index);
    app.get("/orders/:id", show);
    app.post("/orders", verifyAuthToken, create);
    app.put("/orders/:id", verifyAuthToken, edit);
    app.delete("/orders/:id", verifyAuthToken, destroy);
};

export default order_routes;