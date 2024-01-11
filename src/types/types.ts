export type TModalType = "addEvent" | "viewEvent" | "createEvent" | "allEvents";

export interface ICalendarEvent {
    title: string;
    description?: string;
    startDate: Date;
    endDate: Date;
    color: string;
}
export interface ICalendarEvents {
    [key: string]: ICalendarEvent;
}

export interface IDaysWithData {
    [key: string]: {
        events: string[];
    };
}
