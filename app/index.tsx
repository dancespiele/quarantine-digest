import "babel-polyfill";
import * as React from "react";
import * as ReactDom from "react-dom";
import {Page} from "./page";
import "./app.sass";
import "bootstrap/dist/css/bootstrap.min.css";

ReactDom.render(
    <Page/>,
    document.getElementById("root"),
);