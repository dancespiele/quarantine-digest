import {Headers, httpRequest, RequestConfig} from "spiel-request";

const headers: Headers = {
    "Content-Type": "application/json",
};

const options: RequestConfig = {
    domain: process.env.BACKEND_URL || "http://localhost:8000",
    headers,
    responseType: "json",
};

export const request = httpRequest.setRequest(options);