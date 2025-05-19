import { beforeEach } from "node:test";
import type { UseFormReturn } from "react-hook-form";
import { describe, expect, it, vi } from "vitest";
import { useForgotPassword } from "@auth/hooks/useForgotPassword.hook";
import ForgotPassword from "../ForgotPassword.view";
import { TestWrapper } from "@/test/TestWrapper";
import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";



describe("Forgot Password", () => {
    const mockOnSubmit = vi.fn()
    const mockForm = {
        handleSubmit: vi.fn((fn) => (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault()
            fn({ email: "valid@gmail.com" })
        }),
        register: vi.fn((name: keyof { email: string }) => ({ name })),
        formState: {
            isValid: true,
            errors: {}
        }
    } as unknown as UseFormReturn<{ email: string }>
    beforeEach(() => {
        vi.mocked(useForgotPassword).mockReturnValue({
            form: mockForm,
            onSubmit: mockOnSubmit,
            isLoading: false
        })
    })
    it("should normal render form", () => {
        render(React.createElement(ForgotPassword), { wrapper: ({ children }) => TestWrapper({ children }) })

        const emailInp = screen.getByLabelText("Email")
        const submitBtn = screen.getByText("Request reset password")
        const loginLink = screen.getByText("Take me to the login page, now!")

        expect(emailInp).toBeInTheDocument()
        expect(submitBtn).toBeInTheDocument()
        expect(loginLink).toBeInTheDocument()

        expect(loginLink).toHaveAttribute("href", "/auth/login")
        expect(emailInp).toHaveAttribute("type", "email")
        expect(submitBtn).toHaveAttribute("type", "submit")

        expect(submitBtn).toBeDisabled()
    })

    it("should show loading state", () => {
        vi.mocked(useForgotPassword).mockReturnValue({
            form: mockForm,
            onSubmit: mockOnSubmit,
            isLoading: true
        })
        render(React.createElement(ForgotPassword), { wrapper: ({ children }) => TestWrapper({ children }) })

        const submitBtn = screen.getByText("Loading")
        expect(submitBtn).toBeInTheDocument()
    })

    it("should call onSubmit when form is submitted", async () => {
        render(React.createElement(ForgotPassword), { wrapper: ({ children }) => TestWrapper({ children }) })

        fireEvent.submit(screen.getByRole("form"));

        await waitFor(() => {
            expect(mockOnSubmit).toHaveBeenCalledWith({
                email: "valid@gmail.com",
            });
        });
    })
})