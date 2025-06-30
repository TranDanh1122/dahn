import React from "react";

export const useModal = () => {
    const [modalState, setModalState] = React.useState<{ open: boolean }>({ open: false });
    return {
        modalState,
        setModalState,
    };
};