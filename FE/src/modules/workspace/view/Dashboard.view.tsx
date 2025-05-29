import AddNewBtn from "@/components/AddNewBtn.component"
import SquareItem from "@/components/ListItem.component"
import React from "react"
export default function Dashboard(): React.JSX.Element {
    return <div>
        <div>
            <h2>My Workspace</h2>
            <div className="grid grid-cols-5 gap-10 auto-rows-[230px]">
                <SquareItem />
                <AddNewBtn />
            </div>
        </div>
    </div>
}