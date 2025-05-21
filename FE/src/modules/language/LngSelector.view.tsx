import React from "react";
import Select from "@/components/Select.component";
import { useLanguageSelector } from "@lang/useLngSelector.hook";
import type { LanguageDataType } from "@lang/type";
export default React.memo(function LanguageSelector(): React.JSX.Element {
    const { handleChange, defaultValue } = useLanguageSelector()
    return <Select<LanguageDataType> defaultValue={defaultValue} onChange={(value: string | LanguageDataType) => handleChange(value)}
        changeValue="all"
        valueKey="value"
        textKey="text"
        className="border-l px-2 border-l-neutral-300"
        dataSets={[
            { value: "en", text: "English" },
            { value: "vi", text: "Tiếng Việt" },
        ]} />
})