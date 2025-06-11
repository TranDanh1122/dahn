import React from "react"
import { ArrayForm } from "@components/ArrayForm"
import {
    DocumentTableHeader,
    DocumentTableItem,
    DocumentModal
} from "./document"
import { documentSchema } from "@project/models/request.schema"
export default function Step5(): React.JSX.Element {
    return <>
        <ArrayForm
            name="document"
            label="Documents"
            headerEl={<DocumentTableHeader />}
            itemEl={<DocumentTableItem />}
            modalFormContent={<DocumentModal />}
            modalFormSchema={documentSchema}
        />
    </>
}