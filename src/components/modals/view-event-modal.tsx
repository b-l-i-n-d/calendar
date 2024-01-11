import { Modal } from "../ui/modal/modal";

import { useCalendarContext } from "../../context/calendar-context";
import { useModalContext } from "../../context/modal-context";

import { format } from "date-fns";
import { useEffect, useState } from "react";
import { ICalendarEvent } from "../../types/types";
import { Icons } from "../icons";
import { Button } from "../ui/button/button";
import styles from "./view-event-modal.module.scss";

export const ViewEventModal = () => {
    const { isOpen, onClose, type, data } = useModalContext();
    const { events } = useCalendarContext();
    const [currentEvent, setCurrentEvent] = useState<ICalendarEvent | null>(
        null
    );

    const isModalOpen = isOpen && type === "viewEvent";

    const handleModalClose = () => {
        onClose();
    };

    useEffect(() => {
        if (data) {
            setCurrentEvent(events[data]);
        }
    }, [data, events]);

    return (
        <Modal
            isOpen={isModalOpen}
            onClose={handleModalClose}
            title="Event details"
        >
            <div className={styles.viewEventModal}>
                <div className={styles.eventDetails}>
                    {currentEvent ? (
                        <>
                            <p className={styles.eventTitle}>
                                {currentEvent.title}
                            </p>
                            <p className={styles.eventDescription}>
                                {currentEvent.description}
                            </p>
                            <div className={styles.eventDates}>
                                <p className={styles.eventDate}>
                                    {format(
                                        currentEvent.startDate,
                                        "MMM d, yyyy"
                                    )}
                                </p>
                                <Button isIcon>
                                    <Icons name="arrow-right" />
                                </Button>
                                <p className={styles.eventDate}>
                                    {format(
                                        currentEvent.startDate,
                                        "MMM d, yyyy"
                                    )}
                                </p>
                            </div>
                        </>
                    ) : (
                        <p>No event selected</p>
                    )}
                </div>
            </div>
        </Modal>
    );
};
