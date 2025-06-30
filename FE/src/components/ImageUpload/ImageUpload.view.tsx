import React from "react"
import X from "lucide-react/dist/esm/icons/x"
import ImageUp from "lucide-react/dist/esm/icons/image-up"
import useImageUpload from "./ImageUpload.hook"
interface ImageUploadProps extends React.ComponentProps<"input"> {
    children?: React.ReactElement,
    label?: string,
    id: string,
    labelClass?: string,
    reactValue?: string,
    hasDelete?: boolean,
    deleteAction?: () => void,
    previewImgClass?: string,
}
export default React.memo(
    function ImageUpload(
        {
            children,
            deleteAction,
            hasDelete,
            reactValue,
            id,
            label,
            labelClass,
            previewImgClass,
            ...props
        }: ImageUploadProps): React.JSX.Element {
        const { handleChange } = useImageUpload(props.name || "thumbnail")
        return <fieldset className="flex items-center gap-10 relative">
            {label &&
                <label
                    className={`font-semibold text-slate-600 text-sm cursor-pointer ${labelClass}`}
                    aria-label={label}
                    htmlFor={id}>
                    {label}
                </label>
            }
            {
                !reactValue &&
                <ImageUp
                    onClick={() => { document.getElementById(id)?.click() }}
                    className="size-15 text-slate-400 cursor-pointer"
                />

            }
            {
                reactValue &&
                <div
                    title={props.title}
                    className="relative">
                    <img alt=""
                        onClick={() => { document.getElementById(id)?.click() }}
                        className={`size-20 object-cover ${previewImgClass}`}
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
            {children}
            <input
                {...props}
                id={id}
                hidden
                onChange={(e) => { handleChange(e); props.onChange?.(e); }}
                type="file"
                accept={import.meta.env.VITE_ALLOW_IMG_MIMETYPE}
                multiple={false} />
        </fieldset>
    }
)