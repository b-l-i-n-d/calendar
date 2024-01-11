import { Icons } from "../icons";
import { MiniCalendar } from "../mini-calendar/mini-calendar";
import { Button } from "../ui/button/button";

import { useModalContext } from "../../context/modal-context";

import styles from "./sidebar.module.scss";

export const LeftSideBar = () => {
    const { onOpen } = useModalContext();

    return (
        <div className={styles.leftSidebar}>
            <Button
                className={styles.createBtn}
                onClick={() => onOpen("createEvent")}
                block
            >
                <Icons name="calendar" /> Create Event
            </Button>
            <MiniCalendar />
        </div>
    );
};
