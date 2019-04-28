export const encode = (interval: Array<String[]>): string => {
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