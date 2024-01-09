import { format } from "date-fns";
import { useCalendarContext } from "../../context/calendar-context";
import { Icons } from "../icons";
import { Button } from "../ui/button/button";
import { Select } from "../ui/select/select";
import styles from "./navbar.module.scss";

export const Navbar = () => {
    const {
        firstDayOfWeek,
        setFirstDayOfWeek,
        currentMonth,
        currentYear,
        setCurrentMonth,
        setCurrentYear,
    } = useCalendarContext();

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFirstDayOfWeek(Number(e.target.value));
    };

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

    const handleToday = () => {
        setCurrentMonth(new Date().getMonth());
        setCurrentYear(new Date().getFullYear());
    };

    return (
        <nav className={styles.navbar}>
            {/* Logo */}
            <div className={styles.logo}>
                <Icons name="calendar" size={24} /> Calendar
            </div>
            <div className={styles.navlinks}>
                {/* Left side */}
                <div className={styles.navLeft}>
                    <div className={styles.monthNavBtns}>
                        <Button isIcon onClick={handlePrevMonth}>
                            <Icons size={20} name="arrow-left" />
                        </Button>
                        <Button isIcon onClick={handleNextMonth}>
                            <Icons size={20} name="arrow-right" />
                        </Button>
                    </div>
                    <span>
                        {format(new Date(currentYear, currentMonth), "MMMM")}{" "}
                        {currentYear}
                    </span>
                </div>
                {/* Right side */}
                <div className={styles.navRight}>
                    <Button onClick={handleToday}>Today</Button>
                    <Select
                        onChange={handleChange}
                        options={[
                            { value: "0", label: "Sun" },
                            { value: "1", label: "Mon" },
                            { value: "2", label: "Tue" },
                            { value: "3", label: "Wed" },
                            { value: "4", label: "Thu" },
                            { value: "5", label: "Fri" },
                            { value: "6", label: "Sat" },
                        ]}
                        value={String(firstDayOfWeek)}
                    />
                </div>
            </div>
        </nav>
    );
};
