import { afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import type { InputProps } from '@/components/Input.component';
import React from 'react';
import type { FormProps } from '@auth/components/AuthForm';
import '@testing-library/jest-dom';

const filterReactProps = (props: Record<string, any>) => {
    const filtered = { ...props };
    delete filtered.__self;
    delete filtered.__source;
    delete filtered.__proto__;
    return filtered;
};
vi.mock("@/components/Input.component", () => ({
    default: ({ label, error, ...props }: InputProps) => {
        return React.createElement(
            "div",
            filterReactProps({ label, error, ...props }),
            React.createElement("label", { htmlFor: label }, label),
            React.createElement("input", filterReactProps({ ...props, id : label })),
            error && React.createElement("p", { "aria-label": error, "aria-live": "assertive" }, error)
        );
    },
}));
vi.mock("@/components/Button.component", () => ({
    default: ({ className, children, ...props }: React.ComponentProps<"button">) => {
        return React.createElement("button", filterReactProps({ className, ...props }), children)
    }
}))
vi.mock("@/components/Loading.component", () => ({
    default: () => {
        return React.createElement("div", { "aria-label": "Loading" }, "Loading");
    },
}));
vi.mock("@auth/components/AuthForm", () => ({
    default: ({ onSubmit, children }: FormProps) => {
        return React.createElement("form", { onSubmit , role : "form" }, children)
    }
}));
afterEach(() => {
    cleanup();
});