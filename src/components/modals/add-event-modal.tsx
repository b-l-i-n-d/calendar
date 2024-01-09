import { useModalContext } from "../../context/modal-context";
import { Button } from "../ui/button/button";
import { TextInput } from "../ui/input/input";
import { Modal } from "../ui/modal/modal";

import styles from "./add-event-modal.module.scss";

export const AddEventModal = () => {
    const { isOpen, onClose, type, data } = useModalContext();

    const isModalOpen = isOpen && type === "addEvent";
    return (
        <Modal isOpen={isModalOpen} onClose={onClose} title="Add event">
            <div className={styles.addEventModal}>
                <form className={styles.dateForm}>
                    <div className={styles.dateInputs}>
                        <TextInput
                            type="date"
                            label="Start date"
                            value={data || ""}
                            disabled
                            onChange={() => {}}
                            className={styles.dateInput}
                            block
                        />

                        <TextInput
                            type="date"
                            label="End date"
                            value={data || ""}
                            onChange={() => {}}
                            className={styles.dateInput}
                            block
                        />
                    </div>
                    <TextInput
                        label="Title"
                        value=""
                        onChange={() => {}}
                        block
                    />

                    <div className={styles.dateFormBtns}>
                        <Button>Close</Button>
                        <Button color="primary">Add</Button>
                    </div>
                </form>
                <p className="modal__text">{data}</p>
            </div>
        </Modal>
    );
};
