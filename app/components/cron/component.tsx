import * as React from "react";
import {ICronProps} from "./interfaces";

export class Cron extends React.Component<ICronProps, any> {
    public render() {
        return (
            <div className="col-5">
                {this.props.children}
            </div>
        );
    }
} 