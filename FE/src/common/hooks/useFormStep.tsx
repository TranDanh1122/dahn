import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm, type DefaultValues, type Path } from "react-hook-form";
import { ZodSchema } from "zod";

interface FormStepParams<T extends Record<string, unknown>> {
    initData: T
    stepFields: Record<number, (keyof T)[]>
    schema: ZodSchema<T>
}
export default function useFormStep<T extends Record<string, unknown>>({ initData, stepFields, schema }: FormStepParams<T>) {
    const form = useForm<T>({
        defaultValues: initData as DefaultValues<T>,
        resolver: zodResolver(schema)
    });
    const [step, changeStep] = React.useState<number>(1)
    const handleBack = () => {
        changeStep(prev => prev - 1)
    }
    const handleNext = () => {
        form.trigger(stepFields[step] as Path<T>[]).then((isValid) => {
            if (!isValid) return
            changeStep(prev => prev + 1)
        }, (e) => console.log(e))
    }

    return { form, step, handleBack, handleNext };
}