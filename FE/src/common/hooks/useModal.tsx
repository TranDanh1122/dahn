import React from "react";

export const useModal = <T extends { open: boolean }>(
    closeAction?: (args?: unknown) => void,
    openAction?: (args?: unknown) => void
) => {
    const [modalState, setModalState] = React.useState<T>({ open: false } as T);
    const close = (args: T) => {
        closeAction?.(args);
        setModalState(args);
    };
    const open = (args: T) => {
        openAction?.(args)
        setModalState(args)

    };
    return {
        modalState,
        close,
        open,
    };
};