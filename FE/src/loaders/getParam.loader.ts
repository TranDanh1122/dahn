import type { LoaderFunctionArgs } from "react-router-dom"

const getParamLoader = async ({ request }: LoaderFunctionArgs, param: string) => {
    const url = new URL(request.url)
    const searchParams = new URL(url).searchParams
    if (!searchParams.has(param)) throw new Error("You dont have permission here")
    const res: Record<string, string> = {}
    res[param] = searchParams.get(param) ?? ""
    return res
}
export default getParamLoader