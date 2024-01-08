import { useCalendarContext } from "../../context/calendar-context";
import { Select } from "../ui/select/select";
import styles from "./navbar.module.scss";

export const Navbar = () => {
    const { firstDayOfWeek, setFirstDayOfWeek } = useCalendarContext();

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFirstDayOfWeek(Number(e.target.value));
    };

    return (
        <nav className={styles.navbar}>
            <div className={styles.logo}>Logo</div>
            <div className={styles.navbLinks}>
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
        </nav>
    );
};
