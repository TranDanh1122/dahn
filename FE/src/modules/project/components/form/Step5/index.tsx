import React from "react"
import { ArrayForm } from "@components/ArrayForm"
import {
    DocumentTableHeader,
    DocumentTableItem,
    DocumentModal
} from "./document"
import { communitationSchema, documentSchema } from "@project/models/request.schema"
import { CommunicationModal, CommunicationTableHeader, CommunicationTableItem } from "./communication"
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
        <ArrayForm
            name="communitation"
            label="Communitation chanel"
            headerEl={<CommunicationTableHeader />}
            itemEl={<CommunicationTableItem />}
            modalFormSchema={communitationSchema}
            modalFormContent={<CommunicationModal />}
        />
    </>
}