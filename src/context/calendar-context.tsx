import { createContext, useContext, useState } from "react";

interface ICalendarContext {
    firstDayOfWeek: number;
    setFirstDayOfWeek: (day: number) => void;
}

const CalendarContext = createContext<ICalendarContext>({
    firstDayOfWeek: 0,
    setFirstDayOfWeek: () => {},
});

export const useCalendarContext = () => {
    return useContext(CalendarContext);
};

export const CalendarContextProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [firstDayOfWeek, setFirstDayOfWeek] = useState(0);
    return (
        <CalendarContext.Provider value={{ firstDayOfWeek, setFirstDayOfWeek }}>
            {children}
        </CalendarContext.Provider>
    );
};
