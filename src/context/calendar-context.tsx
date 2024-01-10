import React, { createContext, useContext, useState } from "react";

import { ICalendarEvents, IDaysWithData } from "../types/types";

interface ICalendarContext {
    firstDayOfWeek: number;
    currentMonth: number;
    currentYear: number;
    events: ICalendarEvents;
    daysWithData: IDaysWithData;
    setFirstDayOfWeek: React.Dispatch<React.SetStateAction<number>>;
    setCurrentMonth: React.Dispatch<React.SetStateAction<number>>;
    setCurrentYear: React.Dispatch<React.SetStateAction<number>>;
    setEvents: React.Dispatch<React.SetStateAction<ICalendarEvents>>;
    setDaysWithData: React.Dispatch<React.SetStateAction<IDaysWithData>>;
}

const CalendarContext = createContext<ICalendarContext>({
    firstDayOfWeek: 0,
    currentMonth: 0,
    currentYear: 0,
    events: {},
    daysWithData: {},
    setFirstDayOfWeek: () => {},
    setCurrentMonth: () => {},
    setCurrentYear: () => {},
    setEvents: () => {},
    setDaysWithData: () => {},
});

// eslint-disable-next-line react-refresh/only-export-components
export const useCalendarContext = () => {
    return useContext(CalendarContext);
};

export const CalendarContextProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [firstDayOfWeek, setFirstDayOfWeek] = useState<number>(0);
    const [currentMonth, setCurrentMonth] = useState<number>(
        new Date().getMonth()
    );
    const [currentYear, setCurrentYear] = useState<number>(
        new Date().getFullYear()
    );
    const [events, setEvents] = useState<ICalendarEvents>({});
    const [daysWithData, setDaysWithData] = useState<IDaysWithData>({});

    return (
        <CalendarContext.Provider
            value={{
                firstDayOfWeek,
                setFirstDayOfWeek,
                currentMonth,
                setCurrentMonth,
                currentYear,
                setCurrentYear,
                events,
                setEvents,
                daysWithData,
                setDaysWithData,
            }}
        >
            {children}
        </CalendarContext.Provider>
    );
};
