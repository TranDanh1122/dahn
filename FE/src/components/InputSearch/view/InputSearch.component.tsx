import React from "react";
import Input from "@components/Input.component";
import DropdownSearch from "@components/InputSearch/components/DropdownSearch.component";
import type { InputSearchProps } from "../type";
import useInputSearch from "../hooks/useInputSearch.hook";
const InputSearch = <T, K>({
    filter,
    childrenFn,
    searchServiceFn,
    resultItemClick,
    fieldsetClass,
    ...props
}: InputSearchProps<T, K>): React.JSX.Element => {
    const { searching, setSearching, ref, itemClick } = useInputSearch<T, K>({
        resultItemClick,
    });
    return (
        <div ref={ref} className={`relative w-2/3 ${fieldsetClass}`}>
            <Input
                {...props}
                onClick={() => setSearching((prev) => !prev)}
                readOnly={true}
                label={props.label}
                placeholder="Email"
                className="placeholder:font-light!"
            />
            {searching && (
                <DropdownSearch
                    filter={filter}
                    childrenFn={childrenFn}
                    searchServiceFn={searchServiceFn}
                    resultItemClick={itemClick}
                    searching={searching}
                />
            )}
        </div>
    );
};
export default React.memo(InputSearch) as <T, K>(
    props: InputSearchProps<T, K>
) => React.JSX.Element;
