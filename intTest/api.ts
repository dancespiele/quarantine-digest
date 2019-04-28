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

    lab.test("should get all the emails", async () => {
        const response = await request(app)
            .get("/digest");

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
                page: 2,
                entries: 10,
            });
        
        expect(response.body.allEmails.length).to.be.equal(10);
        expect(response.body.allEmails[9]).include(["date", "from", "to", "subject", "content"]);
    });
});