import {ReactElement} from "react";
import {IFeed} from "../components";

export interface IPageState {
    emails: IFeed [];
    total: number;
    active: number;
    showConfig: boolean;
    selected: string;
    times: ReactElement[];
    periodicaly: ReactElement;
    interval: Array<string[]>;
}

