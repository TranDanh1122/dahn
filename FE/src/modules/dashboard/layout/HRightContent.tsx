import React from "react";
import { FolderInput, Plus } from "lucide-react"
import Button from "@/components/Button.component";
export default React.memo(function HRightContent(): React.JSX.Element {
    const commonStyle = "bg-neutral-100 rounded-full font-light! text-sm flex items-center gap-1 hover:bg-neutral-50 border border-neutral-100"
    return <div className="flex items-center gap-3">
        <Button title="New Workspace" className={commonStyle}>
            <Plus className="size-3" /> Workspace
        </Button>
        <Button title="New Project" className={commonStyle}>
            <Plus className="size-3" /> Project
        </Button>
        <Button title="New Contact" className={commonStyle}>
            <Plus className="size-3" /> Contact
        </Button>
        <div className="p-2 bg-neutral-100 rounded-full hover:bg-neutral-50" title="import">
            <FolderInput className="size-5 text-neutral-700" />
        </div>

    </div>
})