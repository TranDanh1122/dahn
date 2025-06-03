import { X } from "lucide-react";
import React from "react";
import { FormProvider } from "react-hook-form";
import { Link } from "react-router-dom";
import type { z } from "zod";
import { initData, ProjectSchema } from "@project/models/request.schema";
import useFormStep from "@/common/hooks/useFormStep";
import { Step1 } from "./form";
import Button from "@/components/Button.component";
const stepFields: Record<number, (keyof z.infer<typeof ProjectSchema>)[]> = {
    1: ["name", "overview", "description", "type"]
};

export default function ProjectForm(): React.JSX.Element {

    const { form, step, handleBack, handleNext } = useFormStep<z.infer<typeof ProjectSchema>>({ initData, stepFields, schema: ProjectSchema })
    const isActive = React.useCallback((st: number) => st == step ? "text-neutral-800" : "text-neutral-400", [step])
    return (
        <>
            <div className="fixed w-screen h-screen bg-white z-1 top-0 left-0 flex  items-center justify-center-safe gap-12">
                <Link to="/">
                    <X className="absolute top-2 right-2 size-6 text-neutral-500" />
                </Link>

                <FormProvider {...form}>
                    <form
                        onSubmit={form.handleSubmit((e) => alert(1))}
                        className="space-y-8 md:w-1/3 lg:w-1/4 w-full px-2"
                        encType="multipart/form-data">

                        {step == 1 && <Step1 />}
                        <div className="space-y-2">

                        </div>
                        <div className="flex items-center justify-between text-sm py-2">
                            {step > 1 && (
                                <Button
                                    className="border border-neutral-300"
                                    onClick={handleBack}
                                    type="button">
                                    Back
                                </Button>
                            )}
                            {step < 5 && (
                                <Button
                                    onClick={handleNext}
                                    type="button"
                                    className="text-white font-light! bg-blue-500 hover:bg-blue-300 ml-auto">
                                    Next
                                </Button>
                            )}
                            {step == 5 && (
                                <Button
                                    type="submit"
                                    className="text-white bg-blue-500 hover:bg-blue-300 ml-auto" >
                                    Finish
                                </Button>
                            )}
                        </div>
                    </form>
                </FormProvider>
                <div
                    className="flex flex-col justify-stretch gap-10 
                    text-left font-semibold 
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
        </>
    );
}