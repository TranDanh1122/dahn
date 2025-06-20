import React from "react";
import FolderInput from "lucide-react/dist/esm/icons/folder-input";
import Plus from "lucide-react/dist/esm/icons/plus";
import Button from "@components/Button.component";
export default React.memo(function HRightContent(): React.JSX.Element {
    const commonStyle = "bg-slate-100 rounded-full font-light! text-sm flex items-center gap-1 hover:bg-slate-50 border border-slate-100";
    return (
        <div className="flex items-center gap-3">
            <Button title="New Workspace" className={commonStyle}>
                <Plus className="size-3" /> Workspace
            </Button>
            <Button title="New Project" className={commonStyle}>
                <Plus className="size-3" /> Project
            </Button>
            <Button title="New Contact" className={commonStyle}>
                <Plus className="size-3" /> Contact
            </Button>
            <div
                className="p-2 bg-slate-100 rounded-full hover:bg-slate-50"
                title="import" >
                <FolderInput className="size-5 text-slate-700" />
            </div>
        </div>
    );
});
