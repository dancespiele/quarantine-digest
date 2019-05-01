import * as React from "react";
import {IDigestProps} from "./interfaces";

export class Digest extends React.Component<IDigestProps, any> {
    public render() {
        return (
            <div className="digest col-12">
                {this.props.children}
            </div>
        );
    }
} 