import React from "react";
export default React.memo(function MilestoneTableHead(): React.JSX.Element {
    return <div className="grid grid-cols-5 border-b border-b-neutral-200 py-2">
        <div className="text-left">Name</div>
        <div className="text-center">Duration (days)</div>
        <div className="text-center">Process (%)</div>
        <div className="text-right">Status</div>
        <div className="text-center">Action</div>
    </div>
})