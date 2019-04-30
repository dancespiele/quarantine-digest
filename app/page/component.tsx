import * as React from "react";
import {RequestOptions} from "spiel-request";
import {Container, Row, Pagination, Button, Form} from "react-bootstrap";
import moment, { Moment } from "moment";
import TimePicker from "rc-time-picker"
import {IPageState} from "./interfaces";
import {request} from "../config";
import {Email, Cron, Calendar} from "../components";
import {setValues} from "../modules";

/**
 * Component page for bussines logic of the application
 */
export class Page extends React.Component<any, IPageState> {
    private now = moment().hour(0).minute(0);
    private time: Moment = this.now;
    public state: IPageState = {
        emails: [],
        total: 0,
        active: 1,
        showConfig: false,
        selected: "intervalForm0",
        times: [this.createTimePicker(0)],
        interval: [["*"], ["*"], [], []],
    }

    componentDidMount() {
        this.getEmails(1);
    }

    public render() {
        const entries = [];
        const radioNames = ["Interval", "Every day", "Every working day", "Every weekend", "Days per week", "Custom"];
        const daysName = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

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
        };

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
                                    <Row className="col-12 config mr-auto">
                                        <div className="col-6">
                                            <h3>Choose days</h3>
                                            <Form>
                                                <Form.Group>
                                                    {radioNames.map((name, index) =>
                                                        <Form.Check
                                                            key={name}
                                                            type="radio"
                                                            label={name}
                                                            name="intervalForm"
                                                            id={`intervalForm${index}`}
                                                            onChange={() => {
                                                                this.setState({
                                                                    selected: `intervalForm${index}`
                                                                });
                                                                this.resetDigest(`intervalForm${index}`);
                                                            }}
                                                            checked={this.state.selected === `intervalForm${index}`}
                                                        />
                                                    )}
                                                </Form.Group>
                                            </Form>
                                        </div>
                                        <div className="col-6 ml-auto">
                                            <div>
                                                {this.state.selected === "intervalForm5" ? 
                                                    <div>
                                                    <h3>Choose date</h3>
                                                        <Calendar
                                                            onChangeCalendar={(day) => this.changeCalendar(day)}
                                                        />
                                                    </div>
                                                : null }

                                                {this.state.selected === "intervalForm4" ?
                                                <div>
                                                <h3>Choose days of the week</h3>
                                                    <Form.Control
                                                        as="select"
                                                        multiple>
                                                        {daysName.map((dayName) => 
                                                            <option key={dayName}>{dayName}</option>
                                                        )}    
                                                    </Form.Control>
                                                    </div>   
                                                : null}
                                                <h3>Choose time</h3>
                                                <div>
                                                    {this.state.times.map((time) => time)}
                                                    {this.state.selected !== "intervalForm0" ?
                                                        <div className="col-12 add">
                                                            <Button 
                                                                variant="success"
                                                                onClick={() => this.addTime()}>add</Button>
                                                            <Button variant="danger"
                                                                onClick={() => this.removeTime()}
                                                                disabled={this.state.times.length <= 1}>remove</Button>
                                                        </div>: null}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-6 list"></div>
                                        <div className="submit col-12">
                                            <Button
                                            >Save</Button>
                                        </div>
                                    </Row>: null}
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
     * @param page number of page 
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

    /**
     * add time element
     */
    private addTime() {
        const interval = this.state.interval;
        interval[2].push("0");
        interval[3].push("0");

        this.time = this.now;
        const times = this.state.times;
        times.push(this.createTimePicker(times.length));
        
        this.setState({
            times: times.slice(),
            interval: interval.slice(),
        });
    }

    /**
     * remove the last time added
     */
    private removeTime() {
        const interval = this.state.interval;
        const times = this.state.times;

        if(times.length > 1) {
            times.pop();
            interval[2].pop;
            interval[3].pop;
            this.setState({
                times: times.slice(),
                interval: interval.slice(),
            });
        }
    }

    /**
     * reset all the digest config values
     */
    private resetDigest(selected: string) {
        this.time = this.now;
        const interval = setValues(selected, [[], [], [], []]);
        this.setState({
            times: [this.createTimePicker(0)].slice(),
            interval: interval.slice(),
        })
    }

    /**
     * add or remove day of the calendar
     */
    private changeCalendar(day: string) {
        const interval = this.state.interval;
        const dayEl = document.getElementById(`day-${day}`);

        if (dayEl && dayEl.className.indexOf("day-selected") !== -1 && interval[0].indexOf(day) !== -1) {
            dayEl.className = dayEl.className.replace("day-selected", "");
            const index = interval[0].indexOf(day);
            interval[0].splice(index, 1);
        } else if (dayEl) {
            dayEl.className = `${dayEl.className} day-selected`;
            interval[0].push(day)
        }

        if(!interval[1].length) interval[1].push("*");

        this.setState({
            interval: interval.slice(),
        });
    }

    /**
     * change the time
     */
    private changeTime(value: string, index: number, typeTime: string) {
        const interval = this.state.interval;
        const times = this.state.times;
        const hours = parseInt(value.split(":")[0])
        const minutes = parseInt(value.split(":")[1]);

        interval[2][index] = hours.toString();
        interval[3][index] = minutes.toString();

        if(typeTime === "interval") {
            interval[2][0] = hours === 0 ? "*" : interval[2][0];
        }

        times[index] = this.createTimePicker(index);

        this.setState({
            interval: interval.slice(),
            times: times.slice() 
        });

        console.log(this.state.interval);
    }
    
    private createTimePicker(index: number) {
        return <TimePicker
            key={index}
            value={this.time}
            id={`time-${index}`}
            onChange={(time: Moment) => {
                this.time = time || this.now;
                if(this.time) {
                    this.changeTime(this.time.format("HH:mm"), index, 
                    this.state.selected === "intervalForm0" ? "interval": "puntual");
                }
            }}
            showSecond={false}
            defaultOpenValue={moment()}
            defaultValue={this.now}
            inputReadOnly
        />
    }
}