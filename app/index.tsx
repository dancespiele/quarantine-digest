import "babel-polyfill";
import * as React from "react";
import * as ReactDom from "react-dom";
import {Page} from "./page";
import {socket} from "./config";
import "./app.sass";
import "bootstrap/dist/css/bootstrap.min.css";
import 'rc-time-picker/assets/index.css';

socket.on("connect", () => {
    if(socket.connected) {
        console.log(`socket is connected with ${process.env.SOCKET_URL || "http://localhost:4000"}`);
    } else {
        console.error("No possible to connect with the socket server");
    }
})

ReactDom.render(
    <Page/>,
    document.getElementById("root"),
);