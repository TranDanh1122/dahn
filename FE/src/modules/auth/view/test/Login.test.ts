import React from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useLogin } from "@auth/hooks/useLogin.hook";
import type { UseFormReturn } from "react-hook-form";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Login from "../Login.view";
import { TestWrapper } from "@/test/TestWrapper";
import '@testing-library/jest-dom';

describe("Login Form", () => {
    const mockOnSubmit = vi.fn();
    const mockForm = {
        handleSubmit: vi.fn((fn) => (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            fn({ email: "test@example.com", password: "Valid@123" });
        }),
        register: vi.fn((name: keyof { email: string; password: string }) => ({ name })),
        formState: {
            isValid: true,
            errors: {},
        },
    } as unknown as UseFormReturn<{ email: string; password: string }>;

    beforeEach(() => {
        vi.mocked(useLogin).mockReturnValue({
            form: mockForm,
            onSubmit: mockOnSubmit,
            isLoading: false
        })
    })

    it("should render normal render form", () => {
        render(React.createElement(Login), { wrapper: ({ children }) => TestWrapper({ children }) });
        const emailInp = screen.getByLabelText("Email")
        const passwordInp = screen.getByLabelText("Password")
        const submitBtn = screen.getByText("Login")
        const forgotPassLink = screen.getByText("Reset it!")
        const registerLink = screen.getByText("Click here newbie!")

        expect(emailInp).toBeInTheDocument()
        expect(passwordInp).toBeInTheDocument()
        expect(submitBtn).toBeInTheDocument()
        expect(forgotPassLink).toBeInTheDocument()
        expect(registerLink).toBeInTheDocument()

        expect(forgotPassLink).toHaveAttribute("href", "/auth/forgot-password")
        expect(registerLink).toHaveAttribute("href", "/auth/register")

        expect(emailInp).toHaveAttribute("type", "email")
        expect(passwordInp).toHaveAttribute("type", "password")
        expect(submitBtn).toHaveAttribute("type", "submit")

        expect(submitBtn).toBeDisabled()
    });

    it("should show loading state", () => {
        vi.mocked(useLogin).mockReturnValue({
            form: mockForm,
            onSubmit: mockOnSubmit,
            isLoading: true
        })
        render(React.createElement(Login), { wrapper: ({ children }) => TestWrapper({ children }) })

        const submitBtn = screen.getByText("Login")

        expect(submitBtn).toBeInTheDocument()
        expect(submitBtn).toBeDisabled()
        expect(submitBtn).toHaveTextContent("Loading...")
    })


    it("should call onSubmit when form is submitted with valid data", async () => {
        render(React.createElement(Login), { wrapper: ({ children }) => TestWrapper({ children }) })

        fireEvent.submit(screen.getByRole("form"));
        await waitFor(() => {
            expect(mockOnSubmit).toHaveBeenCalledWith({
                email: "test@example.com",
                password: "Valid@123",
            });
        });
    });
});