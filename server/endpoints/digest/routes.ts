import {Express} from "express";
import {feed, IFeed} from "../../modules";

export const digest = (app: Express) => {
    app.get("/digest", (req, res) => {
        try {
            let total: number = 0;
            let allEmails: IFeed[] = [];

            if (req.query.entries && req.query.pages) {
                allEmails = feed.getEmails();
                total = allEmails.length;
                const entries = parseInt(req.query.entries);
                const pages = parseInt(req.query.pages);
                const init = (entries * pages) - entries + 1;
                allEmails = allEmails.slice(init, (init + entries > allEmails.length) ?
                    allEmails.length -1 : init + entries);
            } else {
                allEmails = feed.buildFeed();
                total = allEmails.length;
            }

            const response = {
                total,
                allEmails,
            }

            res.status(200).send(response);
        } catch (error) {
            res.status(500).send(error.message);
        }
    });
}