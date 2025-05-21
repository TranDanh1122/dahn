import LngSelectorView from "@lang/LngSelector.view";
import React from "react";

export default React.memo(function Header(): React.JSX.Element {

    return <header className="w-full absolute top-0 left-0 flex items-center p-4 bg-white z-10">
        <img src="/images/logo.png" alt="dahn logo" className="size-30 object-cover aspect-square" />
        <LngSelectorView />
    </header>
})