import type { AppState } from "@/stores";
import LngSelectorView from "@lang/LngSelector.view";
import React from "react";
import { useSelector } from "react-redux";

const Header = (): React.JSX.Element => {
    const { user } = useSelector((state: AppState) => state.persist.auth)
    console.log(user)
    return <header className="w-full absolute z-0 top-0 left-0 flex items-center p-4 bg-white">
        <img src="/images/logo.png" alt="dahn logo" className="size-30 object-cover aspect-square" />
        <LngSelectorView />
        <div>

        </div>
    </header>
}
Header.whyDidYouRender = true
export default Header