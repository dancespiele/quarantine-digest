export interface IEmailProps {
    emails: IFeed[]
}

export interface IFeed {
    from: string;
    to: string;
    subject: string;
    content: string;
    date: string;
}

export interface IEmailState {
    isOpen: boolean[];
}