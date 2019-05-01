import {Codes} from "../page";

export const encode = (interval: Codes): string => {
    let encoded = "";

    interval.forEach((values, index) => {
        values.forEach((value, indexValue) =>{
            if(indexValue === 0 || value === "*") {
                encoded = `${encoded}${index === 0 ? value : ` ${value}`}`;  
            } else {
                encoded = `${encoded},${value}`;
            }
        });
    });

    return encoded;
}