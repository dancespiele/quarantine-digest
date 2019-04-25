import {expect} from "code";
import {feed} from "../../server/modules/feed";
import "reflect-metadata";

describe("Feed", () => {
    let total: number;
    test("shoud returns an array of emails when buildFeed is called", () => {
        const result = feed.buildFeed();
        total = result.length;

        expect(result[0]).include(["date", "from", "to", "subject", "content"]);
    });

    test("should return the same number of emails than the last test when getEmail is called", () => {
        const result = feed.getEmails();

        expect(result.length).to.be.equal(total);
    });
});