import { compareAsc, eachDayOfInterval, format } from "date-fns";
import { useEffect, useId, useState } from "react";

import { Button } from "../ui/button/button";
import { TextInput } from "../ui/input/input";
import { Modal } from "../ui/modal/modal";

import { useCalendarContext } from "../../context/calendar-context";
import { useModalContext } from "../../context/modal-context";

import styles from "./add-event-modal.module.scss";

interface IFormData {
    startDate: string;
    endDate: string;
    title: string;
}

interface IFormError {
    title?: string;
    endDate?: string;
}

export const AddEventModal = () => {
    const { isOpen, onClose, type, data } = useModalContext();
    const { setEvents, setDaysWithData } = useCalendarContext();
    const [formData, setFormData] = useState<IFormData>({
        startDate: "",
        endDate: "",
        title: "",
    });
    const [error, setError] = useState<IFormError>({});
    const formId = useId();

    const isModalOpen = isOpen && type === "addEvent";

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleReset = () => {
        setFormData({
            startDate: "",
            endDate: "",
            title: "",
        });
        setError({
            title: "",
            endDate: "",
        });
    };

    const handleCheckForErrors = () => {
        let hasError = false;
        setError({});
        if (formData.title.trim().length < 1) {
            setError((prev) => ({ ...prev, title: "Title is required" }));
            hasError = true;
        }

        if (
            compareAsc(
                new Date(formData.startDate),
                new Date(formData.endDate)
            ) === 1
        ) {
            setError((prev) => ({
                ...prev,
                endDate: "End date must be after start date.",
            }));
            hasError = true;
        }

        return hasError;
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (handleCheckForErrors()) {
            return;
        }
        const { startDate, endDate, title } = formData;
        const eventDates = eachDayOfInterval({
            start: new Date(startDate),
            end: new Date(endDate),
        });

        const id = Date.now().toString();
        setEvents((prev) => {
            const newEvents = {
                ...prev,
                [id]: {
                    title,
                    startDate: new Date(startDate),
                    endDate: new Date(endDate),
                },
            };
            return newEvents;
        });
        setDaysWithData((prev) => {
            const newDaysWithData = { ...prev };
            eventDates.forEach((date) => {
                const dateString = format(date, "yyyy-MM-dd");
                if (newDaysWithData[dateString]) {
                    newDaysWithData[dateString] = {
                        events: [...newDaysWithData[dateString].events, id],
                    };
                } else {
                    newDaysWithData[dateString] = {
                        events: [id],
                    };
                }
            });

            return newDaysWithData;
        });
        handleModalClose();
    };

    const handleModalClose = () => {
        handleReset();
        onClose();
    };

    useEffect(() => {
        if (data) {
            setFormData((prev) => ({
                ...prev,
                startDate: data,
                endDate: data,
            }));
        }
    }, [data]);

    return (
        <Modal
            isOpen={isModalOpen}
            onClose={handleModalClose}
            title="Add event"
        >
            <div className={styles.addEventModal}>
                <form
                    id={formId}
                    className={styles.dateForm}
                    onSubmit={handleSubmit}
                >
                    <div className={styles.dateInputs}>
                        <TextInput
                            name="startDate"
                            type="date"
                            label="Start date"
                            value={formData.startDate}
                            disabled
                            onChange={handleChange}
                            className={styles.dateInput}
                            required
                            block
                        />

                        <TextInput
                            name="endDate"
                            type="date"
                            label="End date"
                            value={formData.endDate}
                            onChange={handleChange}
                            className={styles.dateInput}
                            error={error?.endDate}
                            required
                            block
                        />
                    </div>
                    <TextInput
                        name="title"
                        label="Title"
                        placeholder="Enter event title"
                        value={formData.title}
                        onChange={handleChange}
                        error={error?.title}
                        required
                        block
                    />

                    <div className={styles.dateFormBtns}>
                        <Button onClick={handleModalClose}>Close</Button>
                        <Button form={formId} type="submit" color="primary">
                            Add
                        </Button>
                    </div>
                </form>
            </div>
        </Modal>
    );
};
