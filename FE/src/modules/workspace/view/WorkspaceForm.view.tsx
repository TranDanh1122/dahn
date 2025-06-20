import React from "react";
import { FormProvider } from "react-hook-form";
import X from "lucide-react/dist/esm/icons/x";
import { Link } from "react-router-dom";
import useWorkspaceForm from "../hook/useWorkspaceForm";
import ChangeStep from "@components/ChangeStep.component";
import LoadingComponent from "@/components/Loading.component";
/**
 * @returns ok we have a form step here, but, again and again, this just FE code and it not use to lauch any rocket to the moon
 * So, please simple :  one form! We have 3 step, but just one form
 * If need to add more step, just create a new view and use it
 * When change step, just change the state and render the view, trigger the form validation
 * Note in your mind, people dont want to know how good your code was, they just want to finish this fk form as fast as it can
 */
const Step1 = React.lazy(() => import("@workspace/view/form/Step1.view"))
const Step2 = React.lazy(() => import("@workspace/view/form/Step2.view"))

export default function WorkspaceForm(): React.JSX.Element {
    const {
        step,
        form,
        onSubmit,
        handleBack,
        handleNext,
        isLoading
    } = useWorkspaceForm();
    const isActive = React.useCallback((st: number) => {
        return step == st ? "text-slate-800" : "text-slate-400"
    }, [step])
    return (
        <>
            <div className="
                fixed z-1 top-0 left-0 
                w-screen h-screen  
                flex flex-col items-center justify-center gap-12">
                <Link to="/">
                    <X className="absolute top-2 right-2 size-6 text-slate-500" />
                </Link>
                <div className="flex items-center gap-10">
                    <div className={`flex items-center gap-2 ${isActive(1)}`}>
                        ① <span className="font-medium">Basic infomation</span>
                    </div>
                    <div className={`flex items-center gap-2 ${isActive(2)}`}>
                        ② <span className="font-medium">Add your workspace member</span>
                    </div>
                    <div className={`flex items-center gap-2  ${isActive(3)}`}>
                        ③ <span className="font-medium">Finish setting</span>
                    </div>
                </div>
                <FormProvider {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8 md:w-1/3 lg:w-1/4 w-full px-2"
                        encType="multipart/form-data">
                        <React.Suspense fallback={<LoadingComponent className="border-s border-s-slate-400" />}>
                            {step == 1 && <Step1 />}
                            {step == 2 && <Step2 />}
                        </React.Suspense>

                        {step == 3 && (
                            <>
                                Hmm, this is plan select view, but now i decided public assets
                                and soure-code after done, so removed this form
                            </>
                        )}
                        <ChangeStep
                            loading={isLoading}
                            step={step}
                            maxStep={3}
                            handleBack={handleBack}
                            handleNext={handleNext}
                        />
                    </form>
                </FormProvider>
            </div>
        </>
    );
}
