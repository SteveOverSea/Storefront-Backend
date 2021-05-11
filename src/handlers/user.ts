import express from "express";
import { User, Users } from "../models/user";

const userStore = new Users();

const index = async (req: express.Request, res: express.Response) => {
    const users = await userStore.index();
    res.send(users);
};

const show = async (req: express.Request, res: express.Response) => {
    const user = await userStore.show(req.params.id);
    res.send(user);
}

const create = async (req: express.Request, res: express.Response) => {
    try {
        const user: User = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            password: req.body.password
        };

        const newUser = await userStore.create(user);
        res.send(newUser);

    } catch (error) {
        res.status(400).send(error);
    }

}

const edit = async (req: express.Request, res: express.Response) => {
    try {
        const user: User = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            password: req.body.password
        };

        const updatedUser = await userStore.update(req.params.id, user);
        res.send(updatedUser);
    } catch (error) {
        res.status(400).send(error);
    }
}

const destroy = async (req: express.Request, res: express.Response) => {
    const deleted = await userStore.delete(req.params.id);
    res.send(deleted);
}

const user_routes = (app: express.Application) => {
    app.get("/", index);
    app.get("/:id", show);
    app.post("/", create);
    app.put("/:id", edit);
    app.delete("/:id", destroy);
};

export default user_routes;