import React from "react"
import { ImageUp } from "lucide-react"
import useImageUpload from "./ImageUpload.hook"
interface ImageUploadProps extends React.ComponentProps<"input"> {
    children?: string,
    label: string,
    id: string,
    labelClass?: string
}
export default React.memo(function ImageUpload({ id, label, labelClass, ...props }: ImageUploadProps): React.JSX.Element {
    const { preview, handleChange } = useImageUpload()
    return <fieldset className="flex items-center gap-10">
        <label className={`font-semibold text-neutral-600 cursor-pointer ${labelClass}`} aria-label={label} htmlFor={id}>
            {label}
        </label>
        {
            !preview && <ImageUp onClick={() => { document.getElementById(id)?.click() }} className="size-15 text-neutral-400 cursor-pointer" />

        }
        {
            preview && <img onClick={() => { document.getElementById(id)?.click() }} className="size-15 object-cover" src={preview} />
        }
        <input id={id} hidden onChange={handleChange} type="file" {...props} accept="image/jpeg,image/png" multiple={false} />
    </fieldset>
})