/// <reference types="vite/client" />
declare module 'nprogress' {
    interface NProgressOptions {
        minimum?: number;
        easing?: string;
        positionUsing?: string;
        speed?: number;
        trickle?: boolean;
        trickleSpeed?: number;
        showSpinner?: boolean;
        barSelector?: string;
        spinnerSelector?: string;
        parent?: string;
        template?: string;
    }

    interface NProgress {
        configure(options: NProgressOptions): NProgress;
        start(): NProgress;
        done(force?: boolean): NProgress;
        inc(amount?: number): NProgress;
        set(n: number): NProgress;
        remove(): void;
        status?: number | null;
    }

    const nprogress: NProgress;
    export = nprogress;
}

declare module "lucide-react/dist/esm/icons/*" {
    import { ComponentType, SVGProps } from "react"
    const Icon: ComponentType<SVGProps<SVGSVGElement>>
    export default Icon
}