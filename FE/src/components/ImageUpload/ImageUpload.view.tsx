import React from "react"
import { ImageUp, X } from "lucide-react"
import useImageUpload from "./ImageUpload.hook"
interface ImageUploadProps extends React.ComponentProps<"input"> {
    children?: string,
    label?: string,
    id: string,
    labelClass?: string,
    reactValue?: string,
    hasDelete?: boolean,
    deleteAction?: () => void
}
export default React.memo(
    function ImageUpload(
        {
            deleteAction,
            hasDelete,
            reactValue,
            id,
            label,
            labelClass,
            ...props
        }: ImageUploadProps): React.JSX.Element {
        const { handleChange } = useImageUpload(props.name || "thumbnail")
        return <fieldset className="flex items-center gap-10">
            {label &&
                <label
                    className={`font-semibold text-neutral-600 cursor-pointer ${labelClass}`}
                    aria-label={label}
                    htmlFor={id}>
                    {label}
                </label>
            }
            {
                !reactValue &&
                <ImageUp
                    onClick={() => { document.getElementById(id)?.click() }}
                    className="size-15 text-neutral-400 cursor-pointer"
                />

            }
            {
                reactValue &&
                <div className="relative">
                    <img
                        onClick={() => { document.getElementById(id)?.click() }}
                        className="size-20 object-cover"
                        src={reactValue} />
                    {
                        hasDelete && <div
                            onClick={() => deleteAction?.()}
                            className="absolute -top-2 -right-2 rounded-full bg-red-500 p-0.5 shadow">
                            <X className="size-3 text-white" />
                        </div>
                    }
                </div>
            }
            <input
                {...props}
                id={id}
                hidden
                onChange={(e) => { handleChange(e) }}
                type="file"
                accept={import.meta.env.VITE_ALLOW_IMG_MIMETYPE}
                multiple={false} />
        </fieldset>
    }
)