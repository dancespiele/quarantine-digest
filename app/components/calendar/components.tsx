import * as React from "react";
import {IPropsCalendar} from "./interfaces";

export const Calendar = (props: IPropsCalendar) => {
    let nameDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let month = [];
    let day = 0;

    const head = <div>{nameDays.map((dayName) => 
        <div className="day-name" key={dayName}>{dayName}</div>)}
    </div>;

    for(let w = 0; w<4; w ++) {
        let week = [];
        for(let d = 0; d<7; d++) {
            week.push(<div className={`day day-${nameDays[d].toLowerCase()}`} 
                onClick={(event: any) => {
                    const dayPicked: string = event.target.id.replace("day-", "")
                    props.onChangeCalendar(dayPicked);
                }} id={`day-${day}`} key={`${w}-${d}`}>{day + 1}</div>);
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