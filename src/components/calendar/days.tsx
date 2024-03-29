import {
    format,
    intervalToDuration,
    isEqual,
    isToday,
    startOfMonth,
} from "date-fns";

import { useCalendarContext } from "../../context/calendar-context";
import { useModalContext } from "../../context/modal-context";

import { Button } from "../ui/button/button";
import styles from "./calendar.module.scss";

interface IDaysProps {
    date: Date;
    index: number;
}

export const Days = ({ date, index }: IDaysProps) => {
    const { currentMonth, daysWithData, events } = useCalendarContext();
    const { onOpen } = useModalContext();
    let maxIndex = 0;

    const isCurrentMonth = date.getMonth() === currentMonth;
    const formattedDate = isEqual(date, startOfMonth(date))
        ? format(date, "MMM d")
        : format(date, "d");
    const todaysEvents = daysWithData[format(date, "yyyy-MM-dd")]?.events || [];

    const eventsWithIndex = todaysEvents.map((event) => {
        const eventStart = format(events[event].startDate, "yyyy-MM-dd");
        const index = daysWithData[eventStart].events.indexOf(event);
        const duration =
            intervalToDuration({
                start: events[event].startDate,
                end: events[event].endDate,
            }).days || 0;
        if (index > maxIndex) {
            maxIndex = index;
        }

        return { event, index, duration };
    });

    const sortedEventsWithIndex = eventsWithIndex
        .sort((a, b) => b.duration - a.duration)
        .slice(0, 2);

    return (
        <div className={styles.container}>
            <div
                className={styles.wrapper}
                tabIndex={0}
                role="button"
                aria-pressed={false}
                onClick={() => onOpen("addEvent", format(date, "yyyy-MM-dd"))}
            >
                <div className={styles.date}>
                    {index < 7 && (
                        <div className={styles.dayName}>
                            {format(date, "EEE")}
                        </div>
                    )}
                    <div
                        className={`${styles.day} ${
                            isToday(date) && styles.today
                        } ${!isCurrentMonth && styles.notCurrentMonth}`}
                    >
                        {formattedDate}
                    </div>

                    {/* {maxIndex >= 1 ? (
                    <>
                        <div
                            className={`${styles.event} ${
                                !eventsWithIndex.find(
                                    (event) => event.index === 0
                                ) && styles.transparent
                            }`}
                        >
                            {eventsWithIndex.find((event) => event.index === 0)
                                ?.event &&
                                events[eventsWithIndex[0].event].title}
                        </div>
                        <div
                            className={`${styles.event} ${
                                !eventsWithIndex.find(
                                    (event) => event.index === 1
                                ) && styles.transparent
                            }`}
                        > */}
                    {/* {eventsWithIndex.find((event) => event.index === 1)
                                ?.event &&
                                events[eventsWithIndex[1].event].title} */}

                    {/* {
                                events[
                                    eventsWithIndex.find(
                                        (event) => event.index === 1
                                    )?.event || ""
                                ].title
                            }
                        </div>
                    </>
                ) : (
                    eventsWithIndex.map((eventWithIndex) => (
                        <div
                            key={eventWithIndex.event}
                            className={styles.event}
                        >
                            {events[eventWithIndex.event].title}
                        </div>
                    ))
                )} */}

                    {/* {sortedEventsWithIndex.map((eventWithIndex) => (
                        <div
                            key={eventWithIndex.event}
                            className={styles.event}
                        >
                            {events[eventWithIndex.event].title}
                        </div>
                    ))}
                    {todaysEvents.length > 2 && (
                        <div className={styles.more}>
                            +{todaysEvents.length - 2}
                        </div>
                    )} */}
                </div>
            </div>
            {todaysEvents.length > 0 && (
                <div className={styles.eventWrapper}>
                    {sortedEventsWithIndex.map((eventWithIndex) => (
                        <div
                            style={{
                                backgroundColor:
                                    events[eventWithIndex.event].color,
                            }}
                            tabIndex={0}
                            role="button"
                            aria-pressed={false}
                            key={eventWithIndex.event}
                            className={`
                                ${styles.event}
                                ${
                                    isEqual(
                                        format(
                                            events[eventWithIndex.event]
                                                .startDate,
                                            "yyyy-MM-dd"
                                        ),
                                        format(date, "yyyy-MM-dd")
                                    ) && styles.startsToday
                                }
                                ${
                                    isEqual(
                                        format(
                                            events[eventWithIndex.event]
                                                .endDate,
                                            "yyyy-MM-dd"
                                        ),
                                        format(date, "yyyy-MM-dd")
                                    ) && styles.endsToday
                                }
                                
                            `}
                            onClick={() =>
                                onOpen("viewEvent", eventWithIndex.event)
                            }
                        >
                            {events[eventWithIndex.event].title}
                        </div>
                    ))}
                    {todaysEvents.length > 2 && (
                        <Button
                            isIcon
                            onClick={() =>
                                onOpen("allEvents", format(date, "yyyy-MM-dd"))
                            }
                            color="ghost"
                        >
                            +{todaysEvents.length - 2}
                        </Button>
                    )}
                </div>
            )}
        </div>
    );
};
