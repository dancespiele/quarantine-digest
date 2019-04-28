import {IFeed} from "../components";

export interface IPageState {
    emails: IFeed [];
    total: number;
    active: number;
    showConfig: boolean;
}

