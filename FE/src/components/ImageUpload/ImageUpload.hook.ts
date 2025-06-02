import React from "react";
import { useFormContext } from "react-hook-form"
export default function useImageUpload(name: string) {
    const form = useFormContext()
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        if (e.target && e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                const file = reader.result as string
                form.setValue(name, file)
            };
            reader.readAsDataURL(file);
        } else {
            form.setValue(name, "")
        }
    }
    return { handleChange }
}