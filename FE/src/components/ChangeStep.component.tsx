import React from "react";
import Button from "./Button.component";
import Loading from "./Loading.component";
interface ChangeStepProps {
    step: number,
    maxStep: number,
    handleBack: () => void,
    handleNext: () => void,
    loading?: boolean
}
export default React.memo(function ChangeStep({
    step,
    maxStep,
    handleBack,
    handleNext,
    loading
}: ChangeStepProps): React.JSX.Element {
    return <div className="flex items-center justify-between text-sm py-2">
        {step > 1 && (
            <Button
                className="border border-neutral-300"
                onClick={handleBack}
                type="button">
                Back
            </Button>
        )}
        {step < maxStep && (
            <Button
                onClick={handleNext}
                type="button"
                className="text-white font-light! bg-blue-500 hover:bg-blue-300 ml-auto">
                Next
            </Button>
        )}
        {step == maxStep && (
            <Button
                type="submit"
                className="text-white bg-blue-500 hover:bg-blue-300 ml-auto" >
                {
                    loading &&
                    <Loading
                        className="border-s-white border-s-2"
                    />
                }
                {
                    !loading && "Finish"
                }
            </Button>
        )}
    </div>
})