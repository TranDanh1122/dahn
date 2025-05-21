import { useTranslation } from "react-i18next"
import type { LanguageDataType } from "@lang/type"

export const useLanguageSelector = () => {
    const { i18n } = useTranslation()
    const handleChange = (data: string | LanguageDataType) => {
        if (typeof data == "string") throw new Error("Wrong Language Datasets")
        const { value, text } = data
        i18n.changeLanguage(value);
        localStorage.setItem("i18nextLngText", text)
    }
    const defaultValue = { value: i18n.language, text: localStorage.getItem("i18nextLngText") || "English" }
    return { handleChange, defaultValue }
}