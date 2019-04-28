import {Express} from "express";
import {feed, IFeed, pages} from "../../modules";

export const digest = (app: Express) => {
    app.get("/digest", (req, res) => {
        try {
            let total: number = 0;
            let allEmails: IFeed[] = [];
            allEmails = feed.buildFeed();
            total = allEmails.length;

            if (req.query.entries && req.query.page) {
                allEmails = pages(parseInt(req.query.page), parseInt(req.query.entries));
            }

            const response = {
                total,
                allEmails: allEmails.map((email) => {
                    return {
                        from: email.from,
                        to: email.to,
                        subject: email.subject,
                        content: email.content,
                        date: email.date.calendar(),
                    };
                }),
            }

            res.status(200).send(response);
        } catch (error) {
            res.status(500).send(error.message);
        }
    });
}