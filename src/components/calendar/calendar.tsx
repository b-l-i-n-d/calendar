import { format, isEqual, isToday, startOfMonth } from "date-fns";
import { generateCalendarDates } from "../../utils/generate-calendar-dates";

import { useCalendarContext } from "../../context/calendar-context";
import styles from "./calendar.module.scss";

export const Calender = () => {
    const { firstDayOfWeek } = useCalendarContext();

    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    const days = generateCalendarDates(
        currentYear,
        currentMonth,
        firstDayOfWeek
    );

    return (
        <div className={styles.calender}>
            {days.map((day, index) => (
                <div key={index} className={styles.wrapper}>
                    <div className={styles.date}>
                        {index < 7 && (
                            <div className={styles.dayName}>
                                {format(day, "EEE")}
                            </div>
                        )}
                        <div
                            className={`${styles.day} ${
                                isToday(day) && styles.today
                            }`}
                        >
                            {isEqual(day, startOfMonth(day))
                                ? format(day, "MMM d")
                                : format(day, "d")}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};
