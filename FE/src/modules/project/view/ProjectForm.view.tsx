import { X } from "lucide-react";
import React from "react";
import { FormProvider } from "react-hook-form";
import { Link } from "react-router-dom";
import type { z } from "zod";
import { initData, ProjectSchema } from "@project/models/request.schema";
import useFormStep from "@/common/hooks/useFormStep";
import ChangeStep from "@components/ChangeStep.component";
import LoadingComponent from "@/components/Loading.component";

const stepFields: Record<number, (keyof z.infer<typeof ProjectSchema>)[]> = {
    1: ["name", "overview", "description", "type"],
};

const Step1 = React.lazy(() => import("./form/Step1.view"));
const Step2 = React.lazy(() => import("./form/Step2.view"));
const Step3 = React.lazy(() => import("./form/Step3.view"));

export default function ProjectForm(): React.JSX.Element {
    const { form, step, handleBack, handleNext } = useFormStep<
        z.infer<typeof ProjectSchema>
    >({ initData, stepFields, schema: ProjectSchema });
    const isActive = React.useCallback(
        (st: number) => (st == step ? "text-neutral-800" : "text-neutral-400"),
        [step]
    );

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
                <form
                    onSubmit={form.handleSubmit((e) => alert(1))}
                    className="space-y-8 md:w-1/3 lg:w-1/4 w-full px-2"
                    encType="multipart/form-data">
                    <React.Suspense
                        fallback={<LoadingComponent className="border-s-neutral-400 border-2 size-10!" />} key={step}>
                        {step == 1 && <Step1 />}

                        {step == 2 && <Step2 />}

                        {step == 3 && <Step3 />}
                    </React.Suspense>

                    <ChangeStep
                        step={step}
                        maxStep={5}
                        handleBack={handleBack}
                        handleNext={handleNext}
                    />
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
