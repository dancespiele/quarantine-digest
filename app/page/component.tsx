import * as React from "react";
import {RequestOptions} from "spiel-request";
import {IPageState} from "./interfaces";
import {request} from "../config";
import {Email, IFeed} from "../components";

/**
 * Component page for bussines logic of the application
 */
export class Page extends React.Component<any, IPageState> {
    public state: IPageState = {
        emails: []
    }

    public async render() {
        const emails = await this.getEmails();

        this.setState({
            emails: emails.slice(),
        });

        return (
            <div>
                {this.state.emails ? 
                    <Email 
                        emails={this.state.emails} 
                    />
                    : <div className="loading"></div>
                }
            </div>
        );
    }

    /**
     * get all the emails
     */
    private async getEmails(): Promise<IFeed[]> {
        const options: RequestOptions = {
            method: "get",
            url: "/digest"
        };

        const response = await request.sendRequest(options);

        return response.body;
    }
}