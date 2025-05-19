import { afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import type { InputProps } from '@/components/Input.component';
import React from 'react';
import type { FormProps } from '@auth/components/AuthForm';
vi.mock("@/components/Input.component", () => ({
    default: ({ label, error, ...props }: InputProps) => {
        return React.createElement(
            "div",
            { label, error, ...props },
            React.createElement("label", label),
            React.createElement("input", { ...props }),
            error && React.createElement("p", { "aria-label": error, "aria-live": "assertive" }, error)
        );
    },
}));
vi.mock("@/components/Button.component", () => ({
    default: ({ className, children, ...props }: React.ComponentProps<"button">) => {
        return React.createElement("button", { className, ...props }, children)
    }
}))
vi.mock("@/components/Loading.component", () => ({
    default: () => {
        return React.createElement("div", { "aria-label": "Loading" }, "Loading");
    },
}));
vi.mock("@auth/components/AuthForm", () => ({
    default: ({ onSubmit, children }: FormProps) => {
        return React.createElement("form", { onSubmit }, children)
    }
}));
afterEach(() => {
  cleanup();
});