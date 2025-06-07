import TextArea from "@components/TextArea.component";
import Input from "@components/Input.component";
import X from "lucide-react/dist/esm/icons/x";
import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import {DatePicker} from "@/components/DatePicker";
import Button from "@/components/Button.component"
export default React.memo(function MileStone(){
    const [open, setOpen] = React.useState<boolean>(false);
    const form = useFormContext();
    const { fields: milestones } = useFieldArray({
        control: form.control,
        name: "milestones",
    });
    const handleClose = () => setOpen(false);
    return (
        <>
            <fieldset >
                <div className="flex items-center gap-2">
                    <legend className="text-neutral-600">Milestones</legend>
                    <Button
                        onClick={() => setOpen(true)}
                        className="
                            font-light! text-neutral-600
                            border border-neutral-400 
                            rounded-full! 
                            p-0! size-6
                            flex items-center justify-center"
                        type="button">
                        +
                    </Button>
                </div>
                {
                    milestones && <div>

                    </div>
                }
            </fieldset>
            {open && <Modal handleClose={handleClose} />}
        </>
    );
});
const Modal = ({
    handleClose,
}: {
    handleClose: () => void;
}): React.JSX.Element => {
    return (
        <>
            <div className="
                    fixed top-0 left-0 
                    bg-black/20 z-1 
                    w-screen h-screen">
            </div>
            <div className="
                    space-y-4
                    rounded-2xl
                    fixed top-1/2 left-1/2 
                    w-1/3 -translate-1/2 
                    bg-white z-10 p-12">
                <X
                    className="absolute top-4 right-4 cursor-pointer text-neutral-600"
                    onClick={handleClose}
                />
                <div className="flex items-end gap-4">
                    <Input
                        labelClass="font-light!"
                        name="name"
                        placeholder="eg: Milestone 1 - Setup Database"
                        label="Milestone Name"
                        fieldsetClass="w-full"
                    />
                    <DatePicker className="w-full" />
                </div>

                <TextArea
                    placeholder="eg: Setup Database"
                    labelClass="font-light!"
                    label="Description"
                    rows={3}
                    name="description"
                />
            </div>
        </>
    );
};
