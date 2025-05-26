import React from "react"
import { ImageUp } from "lucide-react"
interface ImageUploadProps extends React.ComponentProps<"input"> {
    children?: string,
    label: string,
    id: string
}
export default React.memo(function ImageUpload({ id, label, ...props }: ImageUploadProps): React.JSX.Element {
    const [preview, setPreview] = React.useState<string>()
    const handleChange = React.useCallback((e : React.ChangeEvent<HTMLInputElement>) => {
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
    return <fieldset className="flex items-center gap-10">
        <label className="font-semibold text-neutral-600 cursor-pointer" aria-label={label} htmlFor={id}>
            {label}
        </label>
        {
            !preview && <ImageUp onClick={() => { document.getElementById(id)?.click() }} className="size-20 text-neutral-400 cursor-pointer" />

        }
        {
            preview && <img onClick={() => { document.getElementById(id)?.click() }} className="size-20 object-cover" src={preview} />
        }
        <input id={id} hidden onChange={handleChange} type="file" {...props} accept="image/*" multiple={false} />
    </fieldset> 
})