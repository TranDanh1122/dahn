import React from "react"
import Input from "@/components/Input.component"
import useDebounce from "@/common/hooks/useDebounce"
import { useSearchUserSvc } from "@/modules/user"
interface SearchUserByEmailProps extends React.ComponentProps<"input"> {
    children?: React.ReactNode
    resultItemClick?: (user: any) => void
}

export default function SearchUserByEmail({resultItemClick, ...props }: SearchUserByEmailProps): React.JSX.Element {
    const { debouce } = useDebounce()
    const searchService = useSearchUserSvc()
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        if (value.length < 3) return;
        debouce(() => {
            searchService.mutate({ search: value })
        }, 500)
    }
    return <>
        <Input {...props} disabled={true} fieldsetClass="w-2/3" label="" placeholder="Email" className="placeholder:font-light!" />
        <div className="absolute top-[calc(100%+8px)] right-0 w-full p-2 z-10 bg-white border border-neutral-300 rounded-md shadow-lg">
            <Input label="" className="text-sm placeholder:font-light!" placeholder="Search user by email" onChange={handleSearch}></Input>
            {searchService.isPending && <span className="ml-2 text-xs text-blue-500">Searching...</span>}
            {
                searchService.data && searchService.data.users.length > 0 && (
                    <ul className="absolute top-full left-0 w-full bg-white border border-neutral-300 rounded-md shadow-lg z-10">
                        {searchService.data.user.map((user: any) => (
                            <li
                                key={user.id}
                                className="px-4 py-2 hover:bg-neutral-100 cursor-pointer"
                                onClick={() => resultItemClick?.(user)}
                            >
                                {user.email}
                            </li>
                        ))}
                    </ul>
                )
            }
        </div>
    </>
}