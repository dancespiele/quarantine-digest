import {Headers, httpRequest, RequestConfig} from "spiel-request";
import io from "socket.io-client";

export const socket = io(process.env.SOCKET_URL || "http://localhost:4000");

const headers: Headers = {
    "Content-Type": "application/json",
};

const options: RequestConfig = {
    domain: process.env.BACKEND_URL || "http://localhost:8000",
    headers,
    responseType: "json",
};

export const request = httpRequest.setRequest(options);