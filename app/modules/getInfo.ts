export const getInfo = (selected: string) => {
    let info = "";
    if(selected === "intervalForm0") {
        info = "Click on the input to select the time";
    } else if (selected === "intervalForm1") {
        info = "Select the times which you want for every day";
    } else if (selected === "intervalForm2") {
        info = "Select the times which you want for every working day";
    } else if (selected === "intervalForm3") {
        info = "Select the times which you want for every weekend";
    } else if (selected === "intervalForm4") {
        info = "Use Ctrl or Shift for multiple selection";
    } else if (selected === "intervalForm5") {
        info = "Click in the calendar to select day and click again in the day to remove the selection"
    }

    return info;
}