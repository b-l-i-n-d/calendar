import { createContext, useContext, useState } from "react";

interface ICalendarContext {
    firstDayOfWeek: number;
    currentMonth: number;
    currentYear: number;
    setFirstDayOfWeek: (day: number) => void;
    setCurrentMonth: (month: number) => void;
    setCurrentYear: (year: number) => void;
}

const CalendarContext = createContext<ICalendarContext>({
    firstDayOfWeek: 0,
    currentMonth: 0,
    currentYear: 0,
    setFirstDayOfWeek: () => {},
    setCurrentMonth: () => {},
    setCurrentYear: () => {},
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
    const [firstDayOfWeek, setFirstDayOfWeek] = useState(0);
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

    return (
        <CalendarContext.Provider
            value={{
                firstDayOfWeek,
                setFirstDayOfWeek,
                currentMonth,
                setCurrentMonth,
                currentYear,
                setCurrentYear,
            }}
        >
            {children}
        </CalendarContext.Provider>
    );
};
