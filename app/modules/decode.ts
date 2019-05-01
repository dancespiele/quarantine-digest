import {Codes} from "../page";

export const decode = (interval: string): Codes => {
    const decoded = interval
        .split(" ")
        .map((element) => element.split(","));
    
    return decoded;
}