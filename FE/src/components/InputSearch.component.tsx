import React from "react"
import Input from "@/components/Input.component"
import useDebounce from "@/common/hooks/useDebounce"
import type { UseMutationResult } from "@tanstack/react-query"
interface InputSearchProps<T, K> extends React.ComponentProps<"input"> {
    childrenFn?: (data: T) => React.ReactNode,
    resultItemClick?: (data: T) => void,
    searchService: UseMutationResult<T[], Error, K, unknown>
}

export default function SearchUserByEmail<T, K>({ childrenFn, searchService, resultItemClick, ...props }: InputSearchProps<T, K>): React.JSX.Element {
    const { debouce } = useDebounce()
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        if (value.length < 3) return;
        debouce(() => {
            searchService.mutate({ search: value } as K)
        }, 500)
    }
    return <>
        <Input {...props} disabled={true} fieldsetClass="w-2/3" label="" placeholder="Email" className="placeholder:font-light!" />
        <div className="absolute top-[calc(100%+8px)] right-0 w-full p-2 z-10 bg-white border border-neutral-300 rounded-md shadow-lg">
            <Input label="" className="text-sm placeholder:font-light!" placeholder="Search user by email" onChange={handleSearch}></Input>
            {searchService.isPending && <span className="ml-2 text-xs text-blue-500">Searching...</span>}
            {
                searchService.data && searchService.data.length > 0 && (
                    <ul className="absolute top-full left-0 w-full bg-white border border-neutral-300 rounded-md shadow-lg z-10">
                        {searchService.data.map((data: T) => (
                            <li
                                key={data as unknown as string} // Assuming T has a unique string representation
                                className="p-2 hover:bg-neutral-100 cursor-pointer"
                                onClick={() => resultItemClick?.(data)}
                            >
                                {childrenFn?.(data)}
                            </li>
                        ))}
                    </ul>
                )
            }
        </div>
    </>
}