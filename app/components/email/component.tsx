import * as React from "react";
import {Row} from "react-bootstrap";
import {IEmailProps, IEmailState} from "./interfaces";
 
export class Email extends React.Component<IEmailProps, IEmailState> {
    private isOpen: boolean[] = [];
    public state: IEmailState = {
        isOpen: [],
    }

    public componentDidMount() {
        this.props.emails.forEach((email, index) => {
            this.isOpen.push(false);
        });

        this.setState({
            isOpen: this.isOpen.slice(),
        });
    }

    public render() {
        return (
            <div className="email-table">
                <Row className="head">
                    <div className="col-3">Date</div>
                    <div className="col-3">From</div>
                    <div className="col-3">to</div>
                    <div className="col-3">Subject</div>
                </Row>
                {this.props.emails.map((email, index) => {
                    this.isOpen.push(false);

                    return(
                        <div className="row-table" key={`email-${index}`} onClick={() => this.toogleRow(index)}>
                            <Row className="description">
                                <div className="col-3">{email.date}</div>
                                <div className="col-3">{email.from}</div>
                                <div className="col-3">{email.to}</div>
                                <div className="col-3">{email.subject}</div>
                            </Row>
                            {this.state.isOpen[index] ? 
                                <Row className="content">
                                    <div className="col-12">{email.content}</div>
                                </Row>: null}
                        </div>
                    );
                })}
            </div>
        );
    }

    private toogleRow(index: number) {
        this.isOpen = this.isOpen.map((value, rowIndex) => {
            if(value && index !== rowIndex) value = false;

            return value;
        });

        this.isOpen[index] = !this.isOpen[index];

        this.setState({
            isOpen: this.isOpen.slice(),
        });
    }
}