import { format } from "date-fns";
import { useEffect, useState } from "react";

import { Button } from "../ui/button/button";
import { Modal } from "../ui/modal/modal";

import { useCalendarContext } from "../../context/calendar-context";
import { useModalContext } from "../../context/modal-context";

import { ICalendarEvent } from "../../types/types";
import { Icons } from "../icons";

import styles from "./modals.module.scss";

export const AllEventsModal = () => {
    const { isOpen, onClose, type, data } = useModalContext();
    const { events, daysWithData } = useCalendarContext();
    const [todaysEvents, setTodaysEvents] = useState<ICalendarEvent[] | null>(
        null
    );

    const isModalOpen = isOpen && type === "allEvents";

    const handleModalClose = () => {
        onClose();
    };

    useEffect(() => {
        if (data) {
            const eventIdsForDay = daysWithData[data]?.events;
            const eventsForDay = eventIdsForDay?.map(
                (eventId) => events[eventId]
            );

            setTodaysEvents(eventsForDay);
        }
    }, [data, events, daysWithData]);

    return (
        <Modal
            isOpen={isModalOpen}
            onClose={handleModalClose}
            title="All events"
        >
            <div className={styles.viewEventModal}>
                <div className={styles.eventDetails}>
                    {todaysEvents && todaysEvents.length > 0 ? (
                        todaysEvents.map((event) => (
                            <>
                                <p className={styles.eventTitle}>
                                    {event.title}
                                </p>
                                <div className={styles.eventDates}>
                                    <p className={styles.eventDate}>
                                        {format(event.startDate, "MMM d, yyyy")}
                                    </p>
                                    <Button isIcon>
                                        <Icons name="arrow-right" />
                                    </Button>
                                    <p className={styles.eventDate}>
                                        {format(event.startDate, "MMM d, yyyy")}
                                    </p>
                                </div>
                                <p className={styles.eventDescription}>
                                    {event.description}
                                </p>
                            </>
                        ))
                    ) : (
                        <p>No event selected</p>
                    )}
                </div>
            </div>
        </Modal>
    );
};
