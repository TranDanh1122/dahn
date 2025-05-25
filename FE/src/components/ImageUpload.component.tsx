import React from "react"
interface ImageUploadProps extends React.ComponentProps<"input"> {
    children?: string,
    label: string
}
export default React.memo(function ImageUpload({ label, ...props }: ImageUploadProps): React.JSX.Element {
    return <fieldset className="flex items-center gap-10">
        <label aria-label={label} htmlFor={props.id}>
            {label}
        </label>
        <img className="size-20" src />
        <input id={props.id} hidden/>
    </fieldset>
})