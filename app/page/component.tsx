import * as React from "react";
import {RequestOptions} from "spiel-request";
import {Container, Row, Pagination, Button} from "react-bootstrap";
import {IPageState} from "./interfaces";
import {request} from "../config";
import {Email, Cron, Calendar, Form} from "../components";

/**
 * Component page for bussines logic of the application
 */
export class Page extends React.Component<any, IPageState> {
    public state: IPageState = {
        emails: [],
        total: 0,
        active: 1,
        showConfig: false,
    }

    componentDidMount() {
        this.getEmails(1);
    }

    public render() {
        const entries = [];
        if(this.state.total) {
            const pages = Math.ceil(this.state.total / 10);
            for(let i = 1; i <= pages; i++) {
                entries.push(
                    <Pagination.Item key={i} active={i === this.state.active}
                        onClick={async () => {
                            this.setState({
                                active: i,
                            });
                            await this.getEmails(i);
                        }}>{i}
                    </Pagination.Item>,
                )
            }
        }

        return (
            <div>
                {this.state.emails ?
                    <Container>
                        <Row>
                            <Button onClick={() => this.setState({
                                showConfig: !this.state.showConfig,
                            })}>Set interval for the digest</Button>
                        </Row>
                        
                            <Row>
                                <Cron 
                                    getEmails={() => this.getEmails(1)}>
                                    {this.state.showConfig ?
                                    <div>
                                        <Calendar></Calendar>
                                    </div>: null}
                                </Cron>
                            </Row>
                        
                        <Row className="justify-content-end pagination-container">
                            <Pagination>{entries}</Pagination>
                        </Row>
                        <Row>
                            <Email 
                                emails={this.state.emails} 
                            />
                        </Row>
                    </Container>: <div className="loading">LOADING</div>}
            </div>
        );
    }

    /**
     * get all the emails
     */
    private async getEmails(page: number) {
        const options: RequestOptions = {
            method: "get",
            url: `/init?entries=10&page=${page}`,
        };

        const response = await request.sendRequest(options);

        this.setState({
            emails: response.allEmails.slice(),
            total: response.total,
        });
    }
}