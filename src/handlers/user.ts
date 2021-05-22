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
        res.status(400).send(error.message);
    }
};

const show = async (req: express.Request, res: express.Response) => {
    try {
        const user = await userStore.show(req.params.id);
        res.send(user);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const create = async (req: express.Request, res: express.Response) => {
    try {
        const user: User = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            password: req.body.password,
            is_admin: req.body.is_admin
        };

        const newUser = await userStore.create(user);

        const token = jwt.sign({ user: newUser }, process.env.TOKEN_SECRET as jwt.Secret);

        res.send({token});

    } catch (error) {
        res.status(400);
        res.send(error.message);
    }

}

const edit = async (req: express.Request, res: express.Response) => {
    try {
        const user: User = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            password: req.body.password,
            is_admin: req.body.is_admin
        };
    
        if(res.locals.decoded.user.id != req.params.id)
            throw new Error("trying to update another user");

        const updatedUser = await userStore.update(req.params.id, user);
        res.send(updatedUser);
    } catch (error) {
        if (error.message == "trying to update another user")
            res.status(401).send(error.message);
        else
            res.status(400).send(error.message);
    }
}

const destroy = async (req: express.Request, res: express.Response) => {
    try {
        if(res.locals.decoded.user.id != req.params.id)
            throw new Error("trying to update another user");

        const deleted = await userStore.delete(req.params.id);
        res.send(deleted);
    } catch (error) {
        if (error.message == "trying to update another user")
            res.status(401).send(error.message);
        else
            res.status(400).send(error.message);
    }
}

const login = async (req: express.Request, res: express.Response) => {
    try {
        const user: User = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            password: req.body.password,
            is_admin: req.body.is_admin
        };

        const loggedInUser = await userStore.authenticate(user);

        const token = jwt.sign({ user: loggedInUser}, process.env.TOKEN_SECRET as jwt.Secret);        
        res.send({token});
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const returnDecodedToken = async (req: express.Request, res: express.Response) => {
    res.send(res.locals.decoded.user);
}

const user_routes = (app: express.Application) => {
    app.get("/users", index);
    app.get("/users/:id", show);
    app.post("/users", create);
    app.put("/users/:id", verifyAuthToken, edit);
    app.delete("/users/:id", verifyAuthToken, destroy);
    app.post("/users/login", login);
    app.get("/user/decoded", verifyAuthToken, returnDecodedToken);
};

export default user_routes;