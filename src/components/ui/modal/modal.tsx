import React, { useEffect, useRef } from "react";
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
    const modalRef = useRef<HTMLDivElement>(null);

    // useEffect(() => {
    //     console.log("modalRef", modalRef);
    //     if (isOpen) {
    //         const modalElement = modalRef.current?.focus();
    //         console.log("modalElement", modalElement);

    //         //add any focusable HTML element you want to include to this string
    //         const focusableElements = modalElement?.querySelectorAll(
    //             'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    //         );
    //         const firstElement = focusableElements && focusableElements[0];
    //         const lastElement =
    //             focusableElements &&
    //             focusableElements[focusableElements.length - 1];

    //         const handleTabKeyPress = (event: KeyboardEvent) => {
    //             console.log("event", event);
    //             if (event.key === "Tab") {
    //                 if (
    //                     event.shiftKey &&
    //                     document.activeElement === firstElement
    //                 ) {
    //                     event.preventDefault();
    //                     lastElement?.focus();
    //                 } else if (
    //                     !event.shiftKey &&
    //                     document.activeElement === lastElement
    //                 ) {
    //                     event.preventDefault();
    //                     firstElement?.focus();
    //                 }
    //             }
    //         };
    //         modalElement?.addEventListener("keypress", handleTabKeyPress);

    //         return () => {
    //             modalElement?.removeEventListener(
    //                 "keypress",
    //                 handleTabKeyPress
    //             );
    //         };
    //     }
    // }, [isOpen]);

    useEffect(() => {
        const close = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose();
            }
        };
        window.addEventListener("keydown", close);
        return () => window.removeEventListener("keydown", close);
    }, [onClose]);

    if (!isOpen) {
        return null;
    }

    return createPortal(
        <div ref={modalRef} className={styles.modal}>
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
