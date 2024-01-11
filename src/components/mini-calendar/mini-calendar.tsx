import { format, isToday } from "date-fns";
import { useCalendarContext } from "../../context/calendar-context";
import { generateCalendarDates } from "../../utils/generate-calendar-dates";
import styles from "./mini-calendar.module.scss";
import { Button } from "../ui/button/button";
import { Icons } from "../icons";

export const MiniCalendar = () => {
    const {
        currentMonth,
        currentYear,
        firstDayOfWeek,
        setCurrentMonth,
        setCurrentYear,
    } = useCalendarContext();

    const dates = generateCalendarDates(
        currentYear,
        currentMonth,
        firstDayOfWeek
    );

    const handlePrevMonth = () => {
        if (currentMonth === 0) {
            setCurrentMonth(11);
            setCurrentYear(currentYear - 1);
        } else {
            setCurrentMonth(currentMonth - 1);
        }
    };

    const handleNextMonth = () => {
        if (currentMonth === 11) {
            setCurrentMonth(0);
            setCurrentYear(currentYear + 1);
        } else {
            setCurrentMonth(currentMonth + 1);
        }
    };

    return (
        <div className={styles.miniCalendar}>
            <div className={styles.miniCalendarHeader}>
                <span>
                    {format(new Date(currentYear, currentMonth), "MMMM")}{" "}
                    {currentYear}
                </span>
                <div className={styles.miniCalendarNav}>
                    <Button isIcon onClick={handlePrevMonth}>
                        <Icons name="arrow-left" size={14} />
                    </Button>
                    <Button isIcon onClick={handleNextMonth}>
                        <Icons name="arrow-right" size={14} />
                    </Button>
                </div>
            </div>
            <div className={styles.miniCalendarBody}>
                {Array.from({ length: 7 }).map((_, index) => (
                    <div key={index} className={styles.miniCalendarDay}>
                        {format(dates[index], "EEEEE")}
                    </div>
                ))}
                {dates.map((date, index) => (
                    <div
                        key={index}
                        className={`${styles.miniCalendarDate} ${
                            isToday(date) && styles.today
                        }
                        ${
                            date.getMonth() !== currentMonth &&
                            styles.notCurrentMonth
                        }
                        `}
                    >
                        {format(date, "d")}
                    </div>
                ))}
            </div>
        </div>
    );
};
