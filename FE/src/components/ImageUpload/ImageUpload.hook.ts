import React from "react";
export default function useImageUpload () {
   const [preview, setPreview] = React.useState<string>()
    const handleChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target && e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            setPreview("")
        }
    }, []) 
    return {preview , setPreview , handleChange}
}