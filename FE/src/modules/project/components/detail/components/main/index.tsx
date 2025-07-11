import React from "react";
import Step1 from "./steps/step1";
import LoadingComponent from "@/components/Loading.component";
import type { AppState } from "@/stores";
import { useSelector } from "react-redux";
const Step2 = React.lazy(() => import("./steps/step2"))
const Step4 = React.lazy(() => import("./steps/step4"))
const Step3 = React.lazy(() => import("./steps/step3"))
export default function MainDetail(): React.JSX.Element {
    const step = useSelector((state: AppState) => state.project.step);
    return <React.Suspense key={step} fallback={<LoadingComponent />}>
        {
            step == 1 && <Step1 />
        }
        {
            step == 2 && <Step2 />
        }
        {
            step == 3 && <Step3 />
        }
        {
            step == 4 && <Step4 />
        }
    </React.Suspense>
} 