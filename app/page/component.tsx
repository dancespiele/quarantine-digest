import * as React from "react";
import {RequestOptions} from "spiel-request";
import {Container, Row, Button, Form, Alert, Navbar, Nav} from "react-bootstrap";
import Pagination from "react-js-pagination";
import moment, { Moment } from "moment";
import TimePicker from "rc-time-picker"
import {IPageState, IDigest} from "./interfaces";
import {request, socket} from "../config";
import {Email, Digest, Calendar} from "../components";
import {setValues, disableHours, encode, decode, turnReadable, getInfo} from "../modules";

/**
 * Component page for bussines logic of the application
 */
export class Page extends React.Component<any, IPageState> {
    private time?: Moment;
    public state: IPageState = {
        emails: [],
        total: 0,
        active: 1,
        selected: "intervalForm0",
        times: [this.createTimePicker(0)],
        interval: [["*"], ["*"], [], []],
        digests: [],
        error: "",
        section: "home",
        newDigest: false,
        info: getInfo("intervalForm0"),
    };

    public async componentDidMount() {
        if (!location.hash) location.hash = "#home";
        this.setState({
            section: location.hash.replace("#", ""),
        });

        window.addEventListener("hashchange", () => {
            this.setState({
                section: location.hash.replace("#", ""),
            });
        });

        socket.on("digest", (data: IDigest) => {
            this.setState({
                emails: data.allEmails.slice(),
                total: data.total,
                newDigest: true
            });

            setTimeout(() => {
                this.setState({
                    newDigest: false,
                });
            }, 1500);
        })

        await this.getEmails(1);
        await this.getDigets();
    }

    public componentDidUpdate() {
        if(this.state.error) {
            setTimeout(() => {
                this.setState({
                    error: "",
                })
            }, 1500);
        }
    }

    public render() {
        const radioNames = ["Interval", "Every day", "Every working day", "Every weekend", "Days per week", "Custom"];
        const daysName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        return (
            <div>
                <Navbar bg="light">
                    <Navbar.Brand href="#home" onClick={() => {
                        this.setState({
                            section: "home",
                        });
                    }}>Quarantine</Navbar.Brand>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav>
                            <Nav.Link href="#home" onClick={() => {
                                this.setState({
                                    section: "home",
                                });
                            }}>Emails</Nav.Link>
                            <Nav.Link href="#config" onClick={() => {
                                this.setState({
                                    section: "config",
                                })
                            }}>Config</Nav.Link>
                        </Nav>
                        
                    </Navbar.Collapse>
                </Navbar>
                    {this.state.newDigest ? <Alert variant="success">New emails loaded</Alert>: null} 
                    {this.state.section === "home" ? 
                    <Container>
                        <Row className="justify-content-end pagination-container">
                            <Pagination
                                activePage={this.state.active}
                                itemClass="page-item"
                                linkClass="page-link"
                                itemsCountPerPage={10}
                                totalItemsCount={this.state.total}
                                pageRangeDisplayed={5}
                                onChange={this.getEmails.bind(this)}
                            />
                        </Row>
                        {this.state.emails ? <Row>
                            <Email 
                                emails={this.state.emails} 
                            />
                        </Row> : <div className="loading">LOADING</div>}
                    </Container> : this.state.section === "config" ? 
                    <Container>
                        <Row>
                            <h1 className="config-title">Digest Config</h1>
                            <Digest 
                                getEmails={() => this.getEmails(1)}>
                                <Row className="col-12 config mr-auto">
                                    <div className="col-6">
                                        <h3>Select option</h3>
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
                                                                selected: `intervalForm${index}`,
                                                                info: getInfo(`intervalForm${index}`)
                                                            });
                                                            this.resetDigest(`intervalForm${index}`);
                                                        }}
                                                        checked={this.state.selected === `intervalForm${index}`}
                                                    />
                                                )}
                                            </Form.Group>
                                        </Form>
                                    </div>
                                    <div className="col-lg-6 col-xl-6 col-12 ml-auto">
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
                                                    onChange={() => this.multipleDaysWeek()}
                                                    multiple>
                                                    {daysName.map((dayName) => 
                                                        <option key={dayName}>{dayName}</option>
                                                    )}    
                                                </Form.Control>
                                                </div>   
                                            : null}
                                            <h3>{this.state.selected !== "intervalForm0" ? "Choose time" : "Choose interval"}</h3>
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
                                            <Alert className="info" variant="secondary">{this.state.info}</Alert>
                                        </div>
                                    </div>
                                    <div className="submit col-12">
                                        <Button onClick={() => this.saveDigest()}>Save</Button>
                                        {this.state.error ? 
                                            <Alert className="col-xl-3 col-lg-3 col-md-4 col-12" variant="danger">{this.state.error}</Alert> : null}
                                    </div>
                                    {this.state.digests.map((digest, index) =>
                                        <div className="col-12 list" key={index}>
                                            <Alert variant="info">{digest}</Alert>
                                            <Button
                                                onClick={() => this.removeDigest(index)}
                                                variant="danger"
                                            >X</Button>
                                        </div>)}
                                </Row>
                            </Digest>
                        </Row>
                    </Container>: <div>Page not found</div>}   
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

        try {
            const response = await request.sendRequest(options);

            this.setState({
                emails: response.allEmails.slice(),
                total: response.total,
                active: page
            });
        } catch (error) {
            this.setState({
                error: error.message,
            });
            throw new Error(error.message);
        }
    }

    /**
     * get all the digests
     */
    private async getDigets() {
        const options: RequestOptions = {
            method: "get",
            url: "/reader",
        };

        try {
            const response = await request.sendRequest(options);

            const descoded = response.codes.map((code: string) => decode(code));

            const digests = turnReadable(descoded);

            this.setState({
                digests: digests.slice(),
            })
        } catch (error) {
            this.setState({
                error: error.message,
            });
            throw new Error(error.message);
        }
    }

    /**
     * save the code encoded in the backend and if it is success
     * transform the code in a string available to read form the humans  
     */
    private async saveDigest() {
        if(this.state.interval.some((values) => !values.length || values.some((value) => !value))) {
            this.setState({
                error: "please fill the inputs",
            });

            return;
        }

        const code = encode(this.state.interval);

        const options: RequestOptions = {
            method: "post",
            url: "/reader",
            body: {
                code,
            },
        };

        try {
            const response = await request.sendRequest(options);

            const descoded = response.codes.map((code: string) => decode(code));

            const digests = turnReadable(descoded);

            this.setState({
                digests: digests.slice(),
            });

            this.resetDigest(this.state.selected);
        } catch (error) {
            this.setState({
                error: error.message,
            });
            throw new Error(error.message);
        }
    }

    /**
     * delete the digest clicked
     * @param index position of digests array
     */
    private async removeDigest(index: number) {
        const options: RequestOptions = {
            method: "delete",
            url: `/reader?index=${index}`,
        };
        try {
            const response = await request.sendRequest(options);

            const descoded = response.codes.map((code: string) => decode(code));

            const digests = turnReadable(descoded);

            this.setState({
                digests: digests.slice(),
            });
        } catch (error) {
            this.setState({
                error: error.message,
            });
            throw new Error(error.message);
        }
        
    }

    /**
     * add time element
     */
    private addTime() {
        const interval = this.state.interval;
        interval[2].push("");
        interval[3].push("");

        this.time = undefined;
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
            interval[2].pop();
            interval[3].pop();
            this.setState({
                times: times.slice(),
                interval: interval.slice(),
            });
        }
    }

    /**
     * clear the time
     */
    private clearTime(index: number) {
        const interval = this.state.interval;
        this.time = undefined;
        const times = this.state.times;

        interval[2].splice(index, 1);
        interval[3].splice(index, 1);

        times[index] = this.createTimePicker(index);

        this.setState({
            times: times.slice(),
            interval: interval.slice(),
        });
    }

    /**
     * reset all the digest config values
     */
    private resetDigest(selected: string) {
        this.time = undefined;

        if (selected === "intervalForm5") this.removeSelectedDays();

        const interval = setValues(selected, [[], [], [], []]);
        this.setState({
            times: [this.createTimePicker(0)].slice(),
            interval: interval.slice(),
        });
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
    }
    
    private createTimePicker(index: number) {
        return <TimePicker
            key={index}
            className="time-picker"
            value={this.time}
            id={`time-${index}`}
            onChange={(time: Moment) => {
                if(time) {
                    this.time = time;
                    this.changeTime(this.time.format("HH:mm"), index, 
                    this.state.selected === "intervalForm0" ? "interval": "puntual");
                } else {
                    this.clearTime(index);
                }

            }}
            disabledHours={() => disableHours(this.state.selected)}
            showSecond={false}
            defaultOpenValue={moment()}
            inputReadOnly
        />
    }

    private multipleDaysWeek () {
        const interval = this.state.interval;
        const multiple = document.getElementsByTagName("option");
        interval[1] = Array.from(multiple)
            .filter((option) => option.selected)
            .map((element) => element.index.toString());

        this.setState({
            interval: interval.slice(),
        });
    }

    private removeSelectedDays () {
        const selectedDays = document.getElementsByClassName("day-selected");

        Array.from(selectedDays).forEach((selected) => {
            selected.className = selected.className.replace("day-selected", "");
        });
    }
}