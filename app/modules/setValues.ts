export const setValues = (selected: string, interval: Array<string[]>) => {
    const values = interval;
    if (selected === "intervalForm0") {
        values[0][0] = "*";
        values[1][0] = "*";
    } else if (selected === "intervalForm1") {
        values[0][0] = "*"
        for(let i=0; i<7; i++) {
            values[1].push(i.toString());
        }
    } else if (selected === "intervalForm2") {
        values[0][0] = "*"
        for(let i=0; i<5; i++) {
            values[1].push(i.toString());
        }
    } else if (selected === "intervalForm3") {
        values[0][0] = "*"
        for(let i=5; i<7; i++) {
            values[1].push(i.toString());
        }
    } else if (selected === "intervalForm4") {
        values[0][0] = "*"
    }

    return values;
}