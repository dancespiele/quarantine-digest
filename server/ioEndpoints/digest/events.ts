import {Socket} from "socket.io";
import {IFeed, feed, pages} from "../../modules";

const getNewDigest = () => {
    console.log("new digest");
    let total: number = 0;
    let allEmails: IFeed[] = [];
    allEmails = feed.buildFeed();
    total = allEmails.length;
    allEmails = pages(1, 10);
    
    return {
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
}

export const digest = (io: Socket) => {
    setInterval(() => {
        io.emit("digest", getNewDigest());
    }, 60000);
    
}