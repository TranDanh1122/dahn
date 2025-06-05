import React from "react";
// import { useFormContext } from "react-hook-form";
// import { ProjectSchema } from "@project/models/request.schema";
// import type { z } from "zod";
import MileStone from "./modal/MileStone.modal";
export default function Step3(): React.JSX.Element {
    // const form = useFormContext<z.infer<typeof ProjectSchema>>();
    return (
        <>
            <MileStone />
        </>

    );
}
