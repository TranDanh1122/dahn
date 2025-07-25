import React from "react";
import { Dropdown } from "@components/Dropdown";
interface PickerProps {
    dataSet: string[];
    data?: string[],
    onItemClick?: (values: string) => void
}
export default React.memo(function Picker({
    dataSet,
    data,
    onItemClick
}: PickerProps): React.JSX.Element {
    const [values, setValue] = React.useState<Set<string>>(new Set(data?.filter(el => el) ?? []));
    const handleItemClick = React.useCallback((el: string) => {
        setValue((prev) => {
            const newData = new Set(prev)
            if (newData.has(el)) {
                newData.delete(el)
            } else {
                newData.add(el)
            }
            onItemClick?.([...newData].join(","))
            return newData
        })
    }, [])
    return (
        <Dropdown
            dropContent={
                <ul className="overflow-y-scroll max-h-32 scrollbar-thin">
                    {dataSet.length > 0 &&
                        dataSet.map((el, idx) => (
                            <li key={`${el}-${idx}`}
                                className="w-full 
                                hover:bg-slate-100 
                                p-2 rounded-md cursor-pointer"
                                onClick={() => handleItemClick(el)}>
                                {el}
                            </li>
                        ))}
                </ul>
            }>
            <fieldset className="space-y-2">
                <label
                    className="font-light text-slate-600 text-sm"
                    htmlFor="id">
                    Tech stacks
                </label>
                <div
                    role="input"
                    className="
                        w-full min-h-10 max-h-20 
                        overflow-y-scroll scrollbar-thin
                        border border-slate-300
                        hover:border-blue-300 
                        rounded-lg p-2
                        flex flex-wrap items-center gap-2">
                    {values &&
                        [...values].map((el, idx) => (
                            <span
                                key={`span-${el}-${idx}`}
                                className="
                                w-fit cursor-pointer 
                                px-2 py-1 text-sm 
                                bg-slate-100 
                                rounded-full 
                                text-slate-600">
                                {el}
                            </span>
                        ))}
                </div>
            </fieldset>
        </Dropdown>
    );
});
