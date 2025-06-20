import React from "react";
import { AvatarSchema } from "@personally/models/request.schema";
import { FormProvider, useForm } from "react-hook-form";
import type { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSelector } from "react-redux";
import type { AppState } from "@/stores";
import { ImageUpload } from "@components/ImageUpload";
export default React.memo(function Avatar(): React.JSX.Element {
    const user = useSelector((state: AppState) => state.persist.auth.user)
    const form = useForm<z.infer<typeof AvatarSchema>>({
        resolver: zodResolver(AvatarSchema),
        defaultValues: { avatar: user?.avatar_url ?? "" }
    })
    const formRef = React.useRef<HTMLFormElement>(null)
    const onSubmit = (values: z.infer<typeof AvatarSchema>) => {
        console.log(values)
    }
    // React.useEffect(() => {
    //     if (formRef.current) formRef.current.submit()
    // }, [form.watch("avatar")])
    return <FormProvider {...form}>
        <form ref={formRef} className="mx-auto w-fit relative border border-slate-200 rounded-full">
            <ImageUpload
                {...form.register("avatar")}
                title="Change"
                id="avatar_upload"
                reactValue={form.watch("avatar") ?? "/image/logo.png"}
                onChange={() => form.handleSubmit(onSubmit, (e) => alert(e))()}
                previewImgClass="rounded-full size-15! hover:shadow-lg cursor-pointer" >
            </ImageUpload>
        </form>
    </FormProvider>

})