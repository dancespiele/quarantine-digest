import {ReactElement} from "react";
import {IFeed} from "../components";

export type Codes = Array<string[]>;

export interface IPageState {
    emails: IFeed [];
    total: number;
    active: number;
    selected: string;
    times: ReactElement[];
    interval: Codes;
    digests: string[];
    error: string;
    section: string;
    newDigest: boolean;
    info: string
}

export interface IDigest {
    total: number;
    allEmails: IFeed[];
}