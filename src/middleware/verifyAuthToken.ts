import express from "express";
import jwt from "jsonwebtoken";

const verifyAuthToken = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        console.log("verifying token...");
        const authorizationHeader: string = req.headers.authorization as string;
        if (!authorizationHeader) {
            throw new Error("no token provided");
        }
        const token = authorizationHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET as string);
        next();
    } catch (error) {
        res.status(401).send(error.message);
    }
}

export default verifyAuthToken;