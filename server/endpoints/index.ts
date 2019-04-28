import {Express} from "express";
import {digest} from "./digest/routes";
import {init} from "./init/routes";


export const endpoints = (app: Express) => {
    digest(app);
    init(app);
};
