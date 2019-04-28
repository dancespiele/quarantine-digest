import * as React from "react";

export const Calendar = () => {
    let nameDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    let month = [];
    let day = 1;

    const head = <div>{nameDays.map((dayName) => 
        <div className="dayName" key={dayName}>{dayName}</div>)}
    </div>;

    for(let w = 0; w<4; w ++) {
        let week = [];
        for(let d = 0; d<7; d++) {
            week.push(<div className={`day day-${nameDays[d].toLowerCase()}`} key={`${w}-${d}`}>{day}</div>);
            day++;
        }
        month.push(<div className="week" key={w}>{week}</div>)
    }
    
    return(
        <div className="calendar">
            {head}
            {month}
        </div>
    );
}