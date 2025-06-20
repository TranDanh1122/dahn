import React from "react";
import CircleLogoWText from "@components/CircleLogoWText.component";
import SquareArrowOutUpRight from "lucide-react/dist/esm/icons/square-arrow-out-up-right";
import { Infor } from "@project/components/detail";
interface MoreInfoComponenProps extends React.ComponentProps<"div"> {
    text: string,
    image: string,
    label: string,
    hasRedirect?: boolean
}
export default React.memo(function MoreInfo({ text, image, label, hasRedirect, ...props }: MoreInfoComponenProps): React.JSX.Element {
    return <>
        <Infor label={label}>
            <CircleLogoWText
                {...props}
                className={`w-full [&__div]:flex [&__div]:items-center [&__div]:justify-between [&__div]:max-w-none ${props.className}`}
                text={text}
                img={image}>
                {hasRedirect && <SquareArrowOutUpRight className=" right-0 top-0 size-4 text-slate-700" />}
            </CircleLogoWText>
        </Infor>
    </>
})