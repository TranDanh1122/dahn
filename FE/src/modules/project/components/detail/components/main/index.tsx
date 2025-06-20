import React from "react";
import { StepContext } from "@project/components/detail";
import Step1 from "./steps/step1";
export default function MainDetail(): React.JSX.Element {
    const { step } = React.useContext(StepContext)
    return <>
        {
            step == 1 && <Step1 />
        }

    </>
} 