import React from "react"
import Input from "@/components/Input.component"
import useDebounce from "@/common/hooks/useDebounce"
import type { UseMutationResult } from "@tanstack/react-query"
import { useOutsideClick } from "@/common/hooks/useOutsideClick"
interface InputSearchProps<T, K> extends React.ComponentProps<"input"> {
    childrenFn?: (data: T) => React.ReactNode,
    resultItemClick?: (data: T) => void,
    searchService: UseMutationResult<T[], Error, K, unknown>
}

export default function SearchUserByEmail<T, K>({ childrenFn, searchService, resultItemClick, ...props }: InputSearchProps<T, K>): React.JSX.Element {
    const { debouce } = useDebounce()
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        if(!value) return searchService.reset()
        debouce(() => {
            searchService.mutate({ search: value } as K)
        }, 500)
    }
    const [searching, setSearching] = React.useState<boolean>(false)
    React.useEffect(() => {
        if (!searching) {
            searchService.reset()
        }
    } , [searching])
    const ref = useOutsideClick<HTMLDivElement>(() => setSearching(false))
    return <div ref={ref} className="relative w-2/3">
        <Input {...props} onClick={() => { setSearching(prev => !prev) }} readOnly={true} label="" placeholder="Email" className="placeholder:font-light!" />
        {searching && <div className="absolute top-[calc(100%+8px)] right-0 w-full p-2 z-10 bg-white border border-neutral-300 rounded-md shadow-lg">
            <Input label="" className="text-sm placeholder:font-light!" placeholder="Search user by email" onChange={handleSearch}></Input>
            {searchService.isPending && <span className="ml-2 text-xs text-blue-500">Searching...</span>}
            {
                searchService.data && searchService.data.length > 0 && (
                    <ul className="py-2">
                        {searchService.data.map((data: T) => (
                            <li
                                key={data as unknown as string}
                                className="p-2 hover:bg-neutral-100 cursor-pointer rounded-md"
                                onClick={() => resultItemClick?.(data)}
                            >
                                {childrenFn?.(data)}
                            </li>
                        ))}
                    </ul>
                )
            }
        </div>}
    </div>
}