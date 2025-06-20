import X from "lucide-react/dist/esm/icons/x";
import React from "react";
import { FormProvider } from "react-hook-form";
import { Link } from "react-router-dom";
import ChangeStep from "@components/ChangeStep.component";
import Loading from "@components/Loading.component";
import useProjectForm from "@project/hooks/useProjectForm.hook";
import { STEPS } from "@project/const";

const Step1 = React.lazy(() => import("@project/components/form/Step1"));
const Step2 = React.lazy(() => import("@project/components/form/Step2"));
const Step3 = React.lazy(() => import("@project/components/form/Step3"));
const Step4 = React.lazy(() => import("@project/components/form/Step4"));
const Step5 = React.lazy(() => import("@project/components/form/Step5"));

export default function ProjectForm(): React.JSX.Element {
    const {
        form,
        step,
        isActive,
        ref,
        handleSubmit,
        handleBack,
        handleNext,
        loading
    } = useProjectForm()
    return (
        <div
            className="
                    fixed z-1 top-0 left-0
                    w-screen h-screen
                    flex items-center justify-center gap-12">
            <Link to="/">
                <X className="absolute top-2 right-2 size-6 text-slate-500" />
            </Link>

            <FormProvider {...form}>
                <form ref={ref}
                    onSubmit={form.handleSubmit(handleSubmit)}
                    className="space-y-8 md:w-2/3 lg:w-5/7 xl:w-[35%] w-full px-2 "
                    encType="multipart/form-data">
                    <React.Suspense
                        fallback={<Loading className="border-s-slate-400 border-2 size-10!" />} key={step}>
                        {step == 1 && <Step1 />}

                        {step == 2 && <Step2 />}

                        {step == 3 && <Step3 />}

                        {step == 4 && <Step4 />}

                        {step == 5 && <Step5 />}
                        <ChangeStep
                            loading={loading}
                            step={step}
                            maxStep={5}
                            handleBack={handleBack}
                            handleNext={handleNext}
                        />
                    </React.Suspense>
                </form>
            </FormProvider>
            <div
                className="text-sm
                    flex flex-col justify-stretch gap-10 
                    text-left font-semibold pl-10
                    border-l border-l-slate-200">
                {
                    STEPS.map(el =>
                        <p className={`${isActive(Number(el.id))} cursor-pointer hover:underline hover:underline-offset-2`}>
                            {`${el.id}. ${el.name}`}
                        </p>
                    )
                }

            </div>
        </div>
    );
}
