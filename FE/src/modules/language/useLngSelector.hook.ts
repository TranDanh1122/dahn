import { useTranslation } from "react-i18next"
import type { LanguageDataType } from "@lang/type"
import React from "react"

export const useLanguageSelector = () => {
    const { i18n } = useTranslation()
    const handleChange = React.useCallback((data: string | LanguageDataType) => {
        if (typeof data == "string") throw new Error("Wrong Language Datasets")
        const { value, text } = data
        i18n.changeLanguage(value);
        localStorage.setItem("i18nextLngText", text)
    }, [i18n])
    const defaultValue = React.useMemo(() =>({ value: i18n.language, text: localStorage.getItem("i18nextLngText") || "English" }) , [i18n])
    return { handleChange, defaultValue }
}