export const disableHours = (selected: string): number[] => {
    const hour: number[] = [];

        if (selected === "intervalForm2") {
            hour[0] = 8; 
        } else if (selected === "intervalForm3") {
            hour[0] = 10;
        }

    return hour
};