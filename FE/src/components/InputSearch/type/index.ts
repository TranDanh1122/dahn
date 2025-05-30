export interface InputSearchProps<T, K> extends React.ComponentProps<"input"> {
    childrenFn?: (data: T) => React.ReactNode,
    resultItemClick?: (data: T) => void,
    filter?: (data: T) => boolean,
    searchServiceFn: (params: K) => Promise<T[]>
}