export type TModalType = "addEvent" | "viewEvent";

export interface ICalendarEvent {
    title: string;
    description?: string;
    startDate: Date;
    endDate: Date;
}
export interface ICalendarEvents {
    [key: string]: ICalendarEvent;
}

export interface IDaysWithData {
    [key: string]: {
        events: string[];
    };
}
