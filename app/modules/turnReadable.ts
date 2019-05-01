import {Codes} from "../page";

enum DayNames {
    Sunday,
    Monday,
    Tuesday,
    Wednesday,
    Thursday,
    Friday,
    Saturday,
}

export const turnReadable = (intervals: Codes[]): string[] => {
    const currentDigests = intervals.map((interval) => {
        let digest = ""
        if (interval[0][0] === "*" && interval[1][0] === "*") {
            digest = (interval[2][0] === "*") ?
                `Digest in each ${interval[3][0]} min` :
                `Digest in each ${interval[2][0]} h and ${interval[3][0]} min`
        } else if (interval[0][0] === "*"
            && interval[1].length === 7
            && interval[1].every((el) => ["0","1","2","3","4","5","6"].includes(el))) {
            digest = `Digest in every day at ${interval[2].map((el, index)=> `${index > 0 ? " " : ""}${el} h ${interval[3][index]} min`)}`;
        } else if (interval[0][0] === "*"
            && interval[1].length === 5
            && interval[1].every((el) => ["0","1","2","3","4"].includes(el))) {
            digest = `Digest in every working days at ${interval[2].map((el, index)=> `${index > 0 ? " " : ""}${el} h ${interval[3][index]} min`)}`;
        } else if (interval[0][0] === "*"
            && interval[1].length === 2
            && interval[1].every((el) => ["5","6"].includes(el))) {
            digest = `Digest every weekends days at ${interval[2].map((el, index)=> `${index > 0 ? " " : ""}${el} h ${interval[3][index]} min`)}`;
        } else if (interval[0][0] === "*" && interval[1][0] !== "*") {
            digest = `Digest in every ${interval[1].map((el, index) => `${index > 0 ? " " : ""} ${DayNames[parseInt(el)]}`)}` +
            ` at ${interval[2].map((el, index ) => `${index > 0 ? " " : ""}${el} h ${interval[3][index]} min`)}`;
        } else if (interval[0][0] !== "*") {
            digest = `Digest ${interval[0].length > 1 ? "days": "day"} ${interval[0].sort((a, b) => parseInt(a) - parseInt(b))
                    .map((el, index) => `${index > 0 ? " " : ""}${parseInt(el) + 1}${el === "1" 
                ? "st" : el === "2" ? "nd" : el === "3" ? "rd": "th"}`)}` + 
                ` at ${interval[2].map((el, index ) => `${index > 0 ? " " : ""}${el} h ${interval[3][index]} min`)}`;
        }

        return digest;
    });

    return currentDigests;
}