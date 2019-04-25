import * as moment from "moment";
import {LoremIpsum} from "lorem-ipsum/src";

const emails = [];

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

    private buildSentences() {
        const lorem = new LoremIpsum();

        return lorem.generateSentences((Math.random() * 10) + 1);
    }

    
}