import ListItemButton from "@/components/ListItemButton.component"
import SquareItem from "@/components/ListItem.component"
import React from "react"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import type { AppState } from "@/stores"
import { useGetWorkspaceSvc } from "@/modules/workspace/flow/workspace/workspace.service"
import Loading from "@/components/Loading.component"
export default function Dashboard(): React.JSX.Element {
    const user = useSelector((state: AppState) => state.persist.auth.user)
    const { data, isLoading } = useGetWorkspaceSvc()
    return <div className="">
        <div className="space-y-2">
            <h1 className="text-neutral-950 text-2xl font-bold py-20 px-4">
                Hi {user?.full_name ?? user?.email}! Welcome to my app, hope you have a nice trip!
            </h1>
        </div>
        <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
                <h2 className="font-medium text-lg">My Workspace</h2>
                <Link className="font-medium underline text-blue-400">View all</Link>
            </div>
            <div className="grid grid-cols-5 gap-10 auto-rows-[230px]">
                {
                    isLoading && <Loading className="size-5 border-s border-s-neutral-400" />
                }
                {!isLoading && data && data.length > 0 &&
                    data.slice(0, Math.max(data.length - 1, 3)).map(el => {
                        return <SquareItem img={el.image} title={el.name} lastUpdate={el.created_at} />
                    })
                }

                <ListItemButton title="Add new workspace" >
                    <p className="font-black text-8xl text-neutral-400">+</p>
                </ListItemButton>
            </div>
        </div>
    </div>
}