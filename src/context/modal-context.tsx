import { createContext, useContext, useState } from "react";

import { AddEventModal } from "../components/modals/add-event-modal";
import { TModalType } from "../types/types";
import { ViewEventModal } from "../components/modals/view-event-modal";
import { AllEventsModal } from "../components/modals/all-events-modal";

interface IModalContext {
    type: TModalType | null;
    isOpen: boolean;
    data?: string;
    onOpen: (modalType: TModalType, data?: string) => void;
    onClose: () => void;
}

const ModalContext = createContext<IModalContext>({
    type: null,
    isOpen: false,
    onOpen: () => {},
    onClose: () => {},
});

// eslint-disable-next-line react-refresh/only-export-components
export const useModalContext = () => {
    return useContext(ModalContext);
};

export const ModalContextProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [modalType, setModalType] = useState<TModalType | null>(null);
    const [data, setData] = useState<string>("");

    const onOpen = (type: TModalType, data?: string) => {
        setModalType(type);
        setData(data || "");
        setIsOpen(true);
    };
    const onClose = () => {
        setModalType(null);
        setData("");
        setIsOpen(false);
    };

    return (
        <ModalContext.Provider
            value={{
                isOpen,
                type: modalType,
                data,
                onOpen,
                onClose,
            }}
        >
            {children}
            <AddEventModal />
            <ViewEventModal />
            <AllEventsModal />
        </ModalContext.Provider>
    );
};
