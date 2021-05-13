import express from "express";
import { User, Users } from "../models/user";
import jwt from "jsonwebtoken";
import verifyAuthToken from "../middleware/verifyAuthToken";

const userStore = new Users();

const index = async (req: express.Request, res: express.Response) => {
    try {
        const users = await userStore.index();
        res.send(users);
    } catch (error) {
        res.status(400).send(error);
    }
};

const show = async (req: express.Request, res: express.Response) => {
    try {
        const user = await userStore.show(req.params.id);
        res.send(user);
    } catch (error) {
        res.status(400).send(error);
    }
}

const create = async (req: express.Request, res: express.Response) => {
    try {
        const user: User = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            password: req.body.password
        };

        const newUser = await userStore.create(user);

        const token = jwt.sign({ user: newUser }, process.env.TOKEN_SECRET as jwt.Secret);

        res.send({token});

    } catch (error) {
        res.status(400);
        res.send(error);
    }

}

const edit = async (req: express.Request, res: express.Response) => {
    try {
        const user: User = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            password: req.body.password
        };

        // TODO: constrain to only edit the user that is logged in

        const updatedUser = await userStore.update(req.params.id, user);
        res.send(updatedUser);
    } catch (error) {
        res.status(400).send(error);
    }
}

const destroy = async (req: express.Request, res: express.Response) => {
    try {
        const deleted = await userStore.delete(req.params.id);
         // TODO: constrain to only edit the user that is logged in
        res.send(deleted);
    } catch (error) {
        res.status(400).send(error);
    }
}

const login = async (req: express.Request, res: express.Response) => {
    try {
        const user: User = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            password: req.body.password
        };

        const loggedInUser = await userStore.authenticate(user);

        const token = jwt.sign({ user: loggedInUser}, process.env.TOKEN_SECRET as jwt.Secret);        
        res.send({token});
    } catch (error) {
        res.status(400).send(error);
    }
}

const user_routes = (app: express.Application) => {
    app.get("/users", index);
    app.get("/users/:id", show);
    app.post("/users", create);
    app.put("/users/:id", verifyAuthToken, edit);
    app.delete("/users/:id", verifyAuthToken, destroy);
    app.post("/users/login", login);
};

export default user_routes;