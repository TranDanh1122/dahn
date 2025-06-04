import React from "react";
import { Dropdown } from "@components/Dropdown";
import { v4 } from "uuid";
interface PickerProps {
    dataSet: string[];
}
export default React.memo(function Picker({
    dataSet,
}: PickerProps): React.JSX.Element {
    const [values, setValue] = React.useState<Set<string>>(new Set([]));
    const handleItemClick = React.useCallback((el: string) => {
        setValue((prev) => {
            const newData = new Set(prev)
            if (newData.has(el)) {
                newData.delete(el)
            } else {
                newData.add(el)
            }
            return newData
        })
    }, [])
    return (
        <Dropdown
            dropContent={
                <ul>
                    {dataSet.length > 0 &&
                        dataSet.map((el) => (
                            <li key={v4()}
                                className="w-full 
                                hover:bg-neutral-100 
                                p-2 rounded-md cursor-pointer"
                                onClick={() => handleItemClick(el)}>
                                {el}
                            </li>
                        ))}
                </ul>
            }>
            <fieldset className="flex flex-col gap-2">
                <label
                    className="font-light text-neutral-600"
                    htmlFor="id">
                    Tech stacks
                </label>
                <div
                    role="input"
                    className="
                        w-full min-h-10 max-h-20 
                        overflow-y-scroll scrollbar-thin
                        border border-neutral-300
                        hover:border-fuchsia-300 
                        rounded-lg p-2
                        flex flex-wrap items-center gap-2">
                    {values &&
                        [...values].map((el) => (
                            <span
                                key={v4()}
                                className="
                                w-fit cursor-pointer 
                                px-2 py-1 
                                bg-neutral-100 
                                rounded-full 
                                text-neutral-600">
                                {el}
                            </span>
                        ))}
                </div>
            </fieldset>
        </Dropdown>
    );
});
