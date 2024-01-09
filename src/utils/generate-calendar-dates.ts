import {
    Day,
    addDays,
    eachDayOfInterval,
    endOfMonth,
    startOfMonth,
    startOfWeek,
} from "date-fns";

export const generateCalendarDates = (
    year: number,
    month: number,
    firstDayOfWeek: number = 0
) => {
    const startDate = startOfMonth(new Date(year, month));
    const endDate = endOfMonth(startDate);

    const firstWeekday = startOfWeek(startDate, {
        weekStartsOn: firstDayOfWeek as Day,
    });
    const lastWeekday = startOfWeek(endDate, {
        weekStartsOn: firstDayOfWeek as Day,
    });

    const calendarDates: Date[] = eachDayOfInterval({
        start: firstWeekday,
        end: addDays(lastWeekday, 6),
    });

    return calendarDates;
};
