import { MiniCalendar } from "../mini-calendar/mini-calendar";

import styles from "./sidebar.module.scss";

export const LeftSideBar = () => {
    return (
        <div className={styles.leftSidebar}>
            <MiniCalendar />
        </div>
    );
};
