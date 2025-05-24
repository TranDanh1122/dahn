
import LngSelectorView from "@lang/LngSelector.view";
import React from "react";

const Header = React.memo((): React.JSX.Element => {

    return <header className="w-full absolute top-0 left-0 flex items-center p-4 bg-transparent">
        <img src="/images/logo.png" alt="dahn logo" className="size-30 object-cover aspect-square" />
        <LngSelectorView />
    </header>
})
export default Header