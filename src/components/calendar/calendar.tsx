import { Days } from "./days";

import { generateCalendarDates } from "../../utils/generate-calendar-dates";

import { useCalendarContext } from "../../context/calendar-context";

import styles from "./calendar.module.scss";

export const Calender = () => {
    const { firstDayOfWeek, currentMonth, currentYear } = useCalendarContext();

    const dates = generateCalendarDates(
        currentYear,
        currentMonth,
        firstDayOfWeek
    );

    return (
        <div className={styles.calender}>
            {dates.map((date, index) => (
                <Days key={date.toString()} date={date} index={index} />
            ))}
        </div>
    );
};
