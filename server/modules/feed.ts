import * as moment from "moment";
import {IFeed} from "./interfaces";
import * as ipsum from "gen-ipsum";

const emails: IFeed[] = [];

class Feed {
    private crono = [
        {
            value: moment().subtract(5, "minutes").calendar(),
        },
        {
            value: moment().subtract(50, "seconds").calendar(),
        },
        {
            value: moment().subtract(12, "minutes").calendar(),
        },
        {
            value: moment().subtract(5, "minutes").calendar(),
        },
        {
            value: moment().subtract(15, "seconds").calendar(),
        },
        {
            value: moment().subtract(1, "minutes").calendar(),
        },
        {
            value: moment().subtract(23, "minutes").calendar(),
        },
        {
            value: moment().subtract(1, "day").calendar(),
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

        return emails;
    }

    public getEmails() {
        return emails;
    }
}

export const feed = new Feed();