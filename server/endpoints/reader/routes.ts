import {Express} from "express";

const codes: string[] = [];

export const reader = (app: Express) => {
    app.post("/reader", (req, res) => {
        codes.push(req.body.code);

        res.status(200).send({codes});
    });

    app.get("/reader", (req, res) => {
        res.status(200).send({codes});
    });

    app.delete("/reader", (req, res) => {
        codes.splice(req.query.index, 1);

        res.status(200).send({codes});
    });
}