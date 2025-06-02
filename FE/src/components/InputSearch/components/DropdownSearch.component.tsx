import React from "react";
import Input from "@components/Input.component"
import { v4 as uuid } from "uuid"
import useDropdownSearch from "../hooks/useDropdownSearch.hook";
import type { InputSearchProps } from "../type";
interface DropdownSearchProps<T, K> extends InputSearchProps<T, K> {
    searching: boolean
}
const DropdownSearch = <T, K>({ filter, childrenFn, searchServiceFn, resultItemClick, searching }: DropdownSearchProps<T, K>): React.JSX.Element => {
    const { handleSearch, result, searchService } = useDropdownSearch({ filter, searchServiceFn })
    return <>
        {searching && <div className="absolute top-[calc(100%+8px)] right-0 w-full p-2 z-10 bg-white border border-neutral-300 rounded-md shadow-lg">
            <Input label="" className="text-sm placeholder:font-light!" placeholder="Search user by email" onChange={handleSearch}></Input>
            {searchService.isPending && <span className="ml-2 text-xs text-blue-500">Searching...</span>}
            {result && (
                <ul className="py-2">
                    {result.map((data: T) => (
                        <li
                            key={uuid()}
                            className="p-2 hover:bg-neutral-100 cursor-pointer rounded-md"
                            onClick={() => { resultItemClick?.(data); }}
                        >
                            {childrenFn?.(data)}
                        </li>
                    ))}
                </ul>
            )}
        </div>
        }
    </>
}


export default React.memo(DropdownSearch) as <T, K> (props: DropdownSearchProps<T, K>) => React.JSX.Element