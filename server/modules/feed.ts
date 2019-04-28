import * as moment from "moment";
import {IFeed} from "./interfaces";
import * as ipsum from "gen-ipsum";

const emails: IFeed[] = [];

class Feed {
    private crono = [
        {
            value: moment().subtract(5, "minutes"),
        },
        {
            value: moment().subtract(50, "seconds"),
        },
        {
            value: moment().subtract(12, "minutes"),
        },
        {
            value: moment().subtract(5, "minutes"),
        },
        {
            value: moment().subtract(15, "seconds"),
        },
        {
            value: moment().subtract(1, "minutes"),
        },
        {
            value: moment().subtract(23, "minutes"),
        },
        {
            value: moment().subtract(1, "day"),
        }
    ];

    private createSentences(words: number) {
        return ipsum.generate(words);
    }

    private getRandom(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    public buildFeed() {
        const max = this.getRandom(1, 100);

        for(let i = 0; i < max; i++) {
            const position = this.getRandom(1, 7);
            emails.push({
                from: "customer@gmail.com",
                to: "client-quarantine@support.com",
                subject: this.createSentences(this.getRandom(1, 10)),
                content: this.createSentences(this.getRandom(1, 500)),
                date: this.crono[position].value,
            });
        }

        const response = this.orderByDate();

        return response;
    }

    public getEmails() {
        const response = this.orderByDate();
        return response;
    }

    private orderByDate() {
        const ordered = emails.sort((a, b) => {
            return moment(b.date).diff(moment.utc(a.date))
        });

        return ordered;
    }
}

export const feed = new Feed();