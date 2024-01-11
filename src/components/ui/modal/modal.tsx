import React from "react";
import { createPortal } from "react-dom";
import { Icons } from "../../icons";
import styles from "./modal.module.scss";

interface IModalProps {
    children: React.ReactNode;
    isOpen: boolean;
    onClose: () => void;
    className?: string;
    title?: string;
    data?: Record<string, unknown>;
}

export const Modal = ({
    children,
    isOpen,
    onClose,
    className,
    title,
}: IModalProps) => {
    // const modalRef = useRef<HTMLDivElement>(null);

    // const handleClick = (e: Event) => {
    //     if (!(e.target as HTMLElement).closest(`.${styles.body}`)) {
    //         onClose();
    //     }
    // };

    // useEffect(() => {
    //     const modal = modalRef.current;
    //     if (modal) {
    //         modal.focus();
    //     }
    // }, [modalRef]);

    // useEffect(() => {
    // window.addEventListener("keydown", (e: KeyboardEvent) => {
    //     if (e.key === "Escape") {
    //         onClose();
    //     }
    // });
    // document.addEventListener("click", handleClick);
    // return () => {
    // window.removeEventListener("keydown", (e) => {
    //     if (e.key === "Escape") {
    //         onClose();
    //     }
    // });
    //         document.removeEventListener("click", handleClick);
    //     };
    // });

    if (!isOpen) {
        return null;
    }

    return createPortal(
        <div className={styles.modal}>
            <div className={styles.body}>
                {/* Close btn */}
                <button className={styles.closeBtn} onClick={onClose}>
                    <Icons name="xCross" size={24} />
                </button>
                {/* Main content */}
                <div className={`${styles.content} ${className}`}>
                    <h1 className={styles.title}>{title}</h1>
                    {children}
                </div>
            </div>
        </div>,
        document.getElementById("modal-root") as HTMLElement
    );
};
