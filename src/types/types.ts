export type TModalType = "addEvent";

export interface ICalendarEvents {
    [key: string]: {
        title: string;
        startDate: Date;
        endDate: Date;
    };
}

export interface IDaysWithData {
    [key: string]: {
        events: string[];
    };
}
