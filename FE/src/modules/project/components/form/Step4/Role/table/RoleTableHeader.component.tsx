import React from "react";
export default React.memo(function RoleTableHeader(): React.JSX.Element {
    return <div className="grid grid-cols-5 border-b border-b-slate-200 py-2 text-sm">
        <div className="text-left">Role</div>
        <div className="text-center">Project</div>
        <div className="text-center">Milestone</div>
        <div className="text-center">Status</div>
        <div className="text-center">Action</div>
    </div>
})