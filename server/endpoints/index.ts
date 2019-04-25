import {Express} from "express";
import {digest} from "./digest/routes";


export const endpoints = (app: Express) => {
    digest(app);
}