import {Express} from "express";
import {init} from "./init/routes";
import {reader} from "./reader/routes";


export const endpoints = (app: Express) => {
    init(app);
    reader(app);
};
