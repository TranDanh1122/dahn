import Select from "@/components/Select.component";
import type { AppState } from "@/stores";
import LngSelectorView from "@lang/LngSelector.view";
import React from "react";
import { useSelector } from "react-redux";
import { shallowEqual } from 'react-redux';
const Header = React.memo((): React.JSX.Element => {
    const { user } = useSelector((state: AppState) => state.persist.auth , shallowEqual)
    return <header className="w-full absolute top-0 left-0 flex items-center p-4 bg-transparent">
        <img src="/images/logo.png" alt="dahn logo" className="size-30 object-cover aspect-square" />
        <LngSelectorView />
        {
            user && <Select defaultValue={""}
                className="px-2 ml-auto"
                dataSets={[]} >
                <div className="flex items-center gap-6">
                    <span className="font-medium">{user.full_name}</span>
                    <img src={user.avatar_url} alt={user.name} loading="lazy" className="object-cover size-10 rounded-full" />
                </div>
            </Select>

        }

    </header>
})
export default Header