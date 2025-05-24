import type { LoaderFunctionArgs } from "react-router-dom"

export const getPKCECode = async ({ request }: LoaderFunctionArgs) => {
    const url = new URL(request.url)
    const searchParams = new URL(url).searchParams
    if (!searchParams.has("code")) throw new Error("You dont have permission here")
    return { code: searchParams.get("code") }
}