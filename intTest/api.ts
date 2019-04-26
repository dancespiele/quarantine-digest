
import * as dotenv from "dotenv";
import * as fs from "fs";
import "reflect-metadata";
const path = `${__dirname}/.env.test`;

if (fs.existsSync(path)) {
    dotenv.config({path});
}

import * as bodyparser from "body-parser";
import * as express from "express";
import {expect} from "code";
import * as Lab from "lab";
import * as request from "supertest";
import {Express} from "express";
import {endpoints} from "../server/endpoints";

const lab = Lab.script();

export {lab};

lab.experiment("Quarantine api", () => {
    let app: Express;
    let total: string;

    lab.before(() => {
        app = express();
        app.use(bodyparser.json());
        app.use(bodyparser.urlencoded({extended: false}));
        endpoints(app);
    });

    lab.test("should get all the emails", async () => {
        const response = await request(app)
            .get("/digest");

        total = response.body.total;
        expect(response.body).include(["allEmails", "total"]);
        expect(response.body.allEmails[0]).include(["date", "from", "to", "subject", "content"]);
    });
    
    lab.test("should increas the emails", async() => {
        for(let i = 0; i <= 5; i++) {
            const response = await request(app)
                .get("/digest");
            expect(response.body.total).above(total);
        }
    });

    lab.test("should get the second page", async() => {
        const response = await request(app)
            .get("/digest")
            .query({
                pages: 2,
                entries: 10,
            });
        
        expect(response.body.allEmails.length).to.be.equal(10);
        expect(response.body.allEmails[9]).include(["date", "from", "to", "subject", "content"]);
    });
});