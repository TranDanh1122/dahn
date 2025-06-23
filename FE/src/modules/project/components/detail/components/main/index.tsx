import React from "react";
import { StepContext } from "@project/components/detail";
import Step1 from "./steps/step1";
import LoadingComponent from "@/components/Loading.component";
const Step2 = React.lazy(() => import("./steps/step2"))
export default function MainDetail(): React.JSX.Element {
    const { step } = React.useContext(StepContext)
    return <React.Suspense key={step} fallback={<LoadingComponent />}>
        {
            step == 1 && <Step1 />
        }
        {
            step == 2 && <Step2 />
        }
    </React.Suspense>
} 