import * as React from "react";
import {Table} from "react-bootstrap";
import {IEmailProps} from "./interfaces";
 
export const Email = (props: IEmailProps) => {
    return (
        <Table responsive>
            <thead>
                <th>Date</th>
                <th>From</th>
                <th>to</th>
                <th>Subject</th>
            </thead>
            <tbody>
                {props.emails.map((email) => {
                    <tr>
                        <td>{email.date}</td>
                        <td>{email.from}</td>
                        <td>{email.to}</td>
                        <td>{email.subject}</td>
                    </tr>
                })}
            </tbody>
        </Table>
    );
}