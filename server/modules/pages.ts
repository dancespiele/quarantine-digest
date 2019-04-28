import {feed} from "./feed";
import {IFeed} from "./interfaces";

export const pages = (page: number, entries: number): IFeed[] => {
    let emails = feed.getEmails();
    const total = emails.length;
    const init = (entries * page) - entries;
    emails = emails.slice(init, (init + entries > total) ?
        emails.length : init + entries);
    
    return emails;
};
