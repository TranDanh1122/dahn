import type { InputProps } from "@components/Input.component";

export interface InputSearchProps<T, K> extends InputProps {
    childrenFn?: (data: T) => React.ReactNode,
    resultItemClick?: (data: T) => void,
    filter?: (data: T) => boolean,
    searchServiceFn: (params: K) => Promise<T[]>
}