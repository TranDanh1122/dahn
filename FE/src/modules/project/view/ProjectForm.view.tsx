import X from "lucide-react/dist/esm/icons/x";
import React from "react";
import { FormProvider } from "react-hook-form";
import { Link } from "react-router-dom";
import ChangeStep from "@components/ChangeStep.component";
import LoadingComponent from "@components/Loading.component";
import useProjectForm from "@project/hooks/useProjectForm.hook";

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
        handleNext
    } = useProjectForm()
    return (
        <div
            className="
                    fixed z-1 top-0 left-0
                    bg-white w-screen h-screen
                    flex items-center justify-center gap-12">
            <Link to="/">
                <X className="absolute top-2 right-2 size-6 text-neutral-500" />
            </Link>

            <FormProvider {...form}>
                <form ref={ref}
                    onSubmit={form.handleSubmit(handleSubmit)}
                    className="space-y-8 md:w-2/3 lg:w-5/7 xl:w-[35%] w-full px-2 "
                    encType="multipart/form-data">
                    <React.Suspense
                        fallback={<LoadingComponent className="border-s-neutral-400 border-2 size-10!" />} key={step}>
                        {step == 1 && <Step1 />}

                        {step == 2 && <Step2 />}

                        {step == 3 && <Step3 />}

                        {step == 4 && <Step4 />}

                        {step == 5 && <Step5 />}
                        <ChangeStep
                            step={step}
                            maxStep={5}
                            handleBack={handleBack}
                            handleNext={handleNext}
                        />
                    </React.Suspense>
                </form>
            </FormProvider>
            <div
                className="
                    flex flex-col justify-stretch gap-10 
                    text-left font-semibold pl-10
                    border-l border-l-neutral-200 
                    [&__p]:cursor-pointer 
                    [&__p]:hover:underline
                    [&__p]:hover:underline-offset-2">
                <p className={isActive(1)}>1. Overview</p>
                <p className={isActive(2)}>2. Technical</p>
                <p className={isActive(3)}>3. Milestones</p>
                <p className={isActive(4)}>4. Roles & Members</p>
                <p className={isActive(5)}>5. Documents & More Infomation</p>
            </div>
        </div>
    );
}
