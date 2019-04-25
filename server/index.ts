import * as dotenv from "dotenv";
dotenv.config();
import * as bodyparser from "body-parser";
import * as cors from "cors";
import {CorsOptions} from "cors";
import * as express from "express";
import {endpoints} from "./endpoints";

const app = express();

const corsOptions: CorsOptions = {
    origin: "http://localhost:3000",
    methods: ['OPTIONS', 'GET'],
}

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: false}));
app.use(cors(corsOptions));

app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
});

endpoints(app);

app.listen(8000, () => {
    console.log(`Server running in port 8000`);
});
