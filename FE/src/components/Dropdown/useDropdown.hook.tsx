import React from "react";
import { useOutsideClick } from "@/common/hooks/useOutsideClick";
export default function useDropdown() {
    const [show, isShow] = React.useState<boolean>(false)
    const handleOutSideClick = () => isShow(false)
    const dropdownRef = useOutsideClick<HTMLDivElement>(handleOutSideClick)
    return { show, isShow, dropdownRef }
}