import React from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useRegister } from "@auth/hooks/useRegister.hook";
import type { UseFormReturn } from "react-hook-form";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { TestWrapper } from "@/test/TestWrapper";
import '@testing-library/jest-dom';
import Register from "../Register.view";

describe("Register Form", () => {
    const mockOnSubmit = vi.fn();
    const mockForm = {
        handleSubmit: vi.fn((fn) => (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            fn({ email: "test@example.com", password: "Valid@123", confirmPassword: "Valid@123" });
        }),
        register: vi.fn((name: keyof { email: string; password: string }) => ({ name })),
        formState: {
            isValid: true,
            errors: {},
        },
    } as unknown as UseFormReturn<{ email: string; password: string, confirmPassword: string }>;

    beforeEach(() => {
        vi.mocked(useRegister).mockReturnValue({
            form: mockForm,
            onSubmit: mockOnSubmit,
            isLoading: false
        })
    })

    it("should render normal render form", () => {
        render(React.createElement(Register), { wrapper: ({ children }) => TestWrapper({ children }) });
        const emailInp = screen.getByLabelText("Email")
        const passwordInp = screen.getByLabelText("Password")
        const confirmPasswordInp = screen.getByLabelText("Confirm Password")
        const submitBtn = screen.getByText("Login")
        const login = screen.getByText("Take me to the login page, now!")

        expect(emailInp).toBeInTheDocument()
        expect(passwordInp).toBeInTheDocument()
        expect(submitBtn).toBeInTheDocument()
        expect(confirmPasswordInp).toBeInTheDocument()
        expect(login).toBeInTheDocument()

        expect(login).toHaveAttribute("href", "/auth/login")

        expect(emailInp).toHaveAttribute("type", "email")
        expect(passwordInp).toHaveAttribute("type", "password")
        expect(submitBtn).toHaveAttribute("type", "submit")

        expect(submitBtn).toBeDisabled()
    });

    it("should show loading state", () => {
        vi.mocked(useRegister).mockReturnValue({
            form: mockForm,
            onSubmit: mockOnSubmit,
            isLoading: true
        })
        render(React.createElement(Register), { wrapper: ({ children }) => TestWrapper({ children }) })

        const submitBtn = screen.getByText("Register")

        expect(submitBtn).toBeInTheDocument()
        expect(submitBtn).toBeDisabled()
        expect(submitBtn).toHaveTextContent("Loading...")
    })


    it("should call onSubmit when form is submitted with valid data", async () => {
        render(React.createElement(Register), { wrapper: ({ children }) => TestWrapper({ children }) })

        fireEvent.submit(screen.getByRole("form"));
        await waitFor(() => {
            expect(mockOnSubmit).toHaveBeenCalledWith({
                email: "test@example.com",
                password: "Valid@123",
                confirmPassword: "Valid@123"
            });
        });
    });
});