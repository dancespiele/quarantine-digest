import * as dotenv from "dotenv";
dotenv.config();
import * as bodyparser from "body-parser";
import * as cors from "cors";
import {CorsOptions} from "cors";
import * as express from "express";
import {Server} from "http";
import * as socket from "socket.io";
import {endpoints} from "./endpoints";
import {feed} from "./modules";
import {ioEndpoints} from "./ioEndpoints";

feed.buildFeed();

const app = express();
const http = new Server(app);
const io = socket(http);

const corsOptions: CorsOptions = {
    origin: process.env.BACKEND_URL || "http://localhost:3000",
    methods: ["OPTIONS", "GET", "POST", "DELETE"],
}

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: false}));
app.use(cors(corsOptions));

app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
});

endpoints(app);

io.on("connection", (socket) => {
    console.log("connected");

    ioEndpoints(socket);

    socket.on('disconnect', () => {
        console.log('disconnect');
    });
})

app.listen(process.env.BACKEND_URL_PORT || 8000, () => {
    console.log(`Server running in port ${process.env.BACKEND_URL_PORT || 8000}`);
});

http.listen(process.env.SOCKET_URL_PORT || 4000, () => {
    console.log("started on port 4000");
});

