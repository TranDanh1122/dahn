import React from "react";
export default React.memo(function MemberHeader(): React.JSX.Element {
    return <div className="grid grid-cols-5 border-b border-b-neutral-200 py-2">
        <div className="text-left">User</div>
        <div className="text-center">Role</div>
        <div className="text-center">Rate/hour</div>
        <div className="text-center">Total time (h)</div>
        <div className="text-center">Action</div>
    </div>
})