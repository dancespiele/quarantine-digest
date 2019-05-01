import "reflect-metadata";
import * as bodyparser from "body-parser";
import * as express from "express";
import {expect} from "code";
import * as Lab from "lab";
import * as request from "supertest";
import {Express} from "express";
import {endpoints} from "../server/endpoints";
import {feed} from "../server/modules";

const lab = Lab.script();

export {lab};

lab.experiment("Quarantine api", () => {
    let app: Express;
    let total: string;

    lab.before(() => {
        feed.buildFeed();
        app = express();
        app.use(bodyparser.json());
        app.use(bodyparser.urlencoded({extended: false}));
        endpoints(app);
    });

    lab.test("should get the inital emails", async() => {
        const response = await request(app)
            .get("/init");

        total = response.body.total;
        expect(response.body).include(["allEmails", "total"]);
        expect(response.body.allEmails[0]).include(["date", "from", "to", "subject", "content"]);
    });


    lab.test("should post the code and return back", async () => {
        const response = await request(app)
            .post("/reader")
            .send({code: "* 1,2,3,4,5 10,18 0"});

        expect(response.body.codes[0]).to.be.equal("* 1,2,3,4,5 10,18 0")
    });
});