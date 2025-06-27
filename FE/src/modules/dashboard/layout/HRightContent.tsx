import React from "react";
import FolderInput from "lucide-react/dist/esm/icons/folder-input";
import Button from "@components/Button.component";
export default React.memo(function HRightContent(): React.JSX.Element {
    return (
        <div className="flex items-center gap-3">
            <Button
                title="New Workspace"
                className={` border border-slate-200
                    rounded-full font-light! 
                    text-sm flex items-center gap-1
                     bg-slate-100 hover:bg-slate-50
                     `}>
                Workspace
            </Button>

            <div
                className="p-2 bg-slate-100 rounded-full hover:bg-slate-50"
                title="import"
            >
                <FolderInput className="size-5 text-slate-700" />
            </div>
        </div>
    );
});
