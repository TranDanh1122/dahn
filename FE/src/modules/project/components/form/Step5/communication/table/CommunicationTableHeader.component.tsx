import React from "react";
export default function CommunicationTableHeader(): React.JSX.Element {
    return <div className="grid grid-cols-5 border-b border-b-slate-200 py-2">
        <div className="text-left">Channel</div>
        <div className="text-center">Link</div>
        <div className="text-center">Meeting</div>
        <div className="text-center">Time</div>
        <div className="text-center">Action</div>
    </div>
}