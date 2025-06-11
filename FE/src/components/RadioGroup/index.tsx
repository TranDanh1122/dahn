import React from "react";
import RadioItem from "./RadioItem.component";

export interface RadioGroupProps
    extends Omit<React.ComponentProps<"input">, "onChange"> {
    label: string;
    dataSets: ItemData[],
    onChange: (value: string) => void;
    itemEl?: React.ReactElement
}

/**
 * RadioGroup component renders a group of radio buttons.
 * @param {string} label - Common label of this group
 * @param {ItemData[]} dataSets - List of options to choose
 * @param {(value: string): void} onChange - Click on item event
 * @param {React.ReactElement} [itemEl] - Custom UI for each item
 * @returns {React.JSX.Element}
 */
export default React.memo(function RadioGroup({
    label,
    name,
    onChange,
    value,
    dataSets,
    itemEl
}: RadioGroupProps): React.JSX.Element {
    return (
        <fieldset role="radiogroup" aria-labelledby={name}>
            {label && (
                <legend id={name} className="font-bold text-sm tracking-wider">
                    {label}
                </legend>
            )}
            <div className="flex items-center justify-between w-full gap-4">
                {dataSets &&
                    dataSets.map((el) => (
                        <RadioItem
                            key={el.value}
                            data={el}
                            onChange={onChange}
                            checked={el.value == value}
                            itemEl={itemEl}
                        />
                    ))}
            </div>
        </fieldset>
    );
});
export type ItemData = { value: string; text: string };
