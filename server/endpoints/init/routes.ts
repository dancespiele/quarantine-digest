import {Express} from "express";
import {feed, IFeed, pages} from "../../modules";

export const init = (app: Express) => {
    app.get("/init", (req, res) => {
        let emails: IFeed[] = [];
        emails = feed.getEmails();

        const total = emails.length;

        if (req.query.entries && req.query.page) {
            emails = pages(parseInt(req.query.page), parseInt(req.query.entries));
        }

        const response = {
            allEmails: emails.map((email) => {
                return {
                    from: email.from,
                    to: email.to,
                    subject: email.subject,
                    content: email.content,
                    date: email.date.calendar(),
                };
            }),
            total,
        }

        res.status(200).send(response);
    });
}