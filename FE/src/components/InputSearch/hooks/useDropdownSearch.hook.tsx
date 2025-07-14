import React from "react";
import useDebounce from "@/common/hooks/useDebounce";
import { useMutation } from "@tanstack/react-query"
import type { InputSearchProps } from "../type";
export default function useDropdownSearch<T, K>({ searchServiceFn, filter }: Pick<InputSearchProps<T, K>, "searchServiceFn" | "filter">) {
    const { debouce } = useDebounce()
    const searchService = useMutation({
        mutationFn: searchServiceFn
    })
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        if (!value) return searchService.reset()
        debouce(() => {
            searchService.mutate({ search: value } as K)
        }, 500)
    }
    const result = React.useMemo(() => {
        if (searchService.data && searchService.data.length > 0)
            return searchService.data.filter(item => filter?.(item))
        return []
    }, [searchService.data])
    return { handleSearch, result, searchService }
}