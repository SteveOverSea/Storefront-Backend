import express from "express";
import { Order_List, Order_Lists } from "../models/order_list";
import verifyAuthToken from "../middleware/verifyAuthToken";

const order_listStore = new Order_Lists();

const index = async (req: express.Request, res: express.Response) => {
    try {
        const order_lists = await order_listStore.index();
        res.send(order_lists);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const show = async (req: express.Request, res: express.Response) => {
    try {
        const order_list = await order_listStore.show(req.params.id);
        res.send(order_list);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const create = async (req: express.Request, res: express.Response) => {
    try {
        const order_list: Order_List = {
            order_id: req.body.order_id,
            quantity: req.body.quantity,
            product_id: req.body.product_id
        };

        const newOrder_List = await order_listStore.create(order_list);
        res.send(newOrder_List);

    } catch (error) {
        res.status(400);
        res.send(error.message);
    }

}

const edit = async (req: express.Request, res: express.Response) => {
    try {
        const order_list: Order_List = {
            order_id: req.body.order_id,
            quantity: req.body.quantity,
            product_id: req.body.product_id
        };

        const updatedOrder_List = await order_listStore.update(req.params.id, order_list);
        res.send(updatedOrder_List);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const destroy = async (req: express.Request, res: express.Response) => {
    try {
        const deleted = await order_listStore.delete(req.params.id);
        res.send(deleted);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getAllOrders = async (req: express.Request, res: express.Response) => {
    try {
        const allOrders = await order_listStore.getAllOrders(req.params.id);
        res.send(allOrders);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const order_list_routes = (app: express.Application) => {
    app.get("/order-lists", index);
    app.get("/order-lists/:id", show);
    app.post("/order-lists", verifyAuthToken, create);
    app.put("/order-lists/:id", verifyAuthToken, edit);
    app.delete("/order-lists/:id", verifyAuthToken, destroy);
    app.get("/order-lists-for-user/:id", verifyAuthToken, getAllOrders);
};

export default order_list_routes;