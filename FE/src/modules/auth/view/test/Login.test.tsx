import { beforeEach, describe, expect, it, vi } from "vitest";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import Login from "../Login.view";
import { TestWrapper } from "@/test/TestWrapper";
import '@testing-library/jest-dom';
import { useLogin } from "@auth/hooks/useLogin.hook";
import { useTranslation } from "react-i18next";

vi.mock("@auth/hooks/useLogin.hook", () => ({
    useLogin: vi.fn()
}))
vi.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key: string) => key,
        i18n: {
            changeLanguage: vi.fn(),
            language: 'en',
        },
    }),
}));
describe("Login Form", () => {
    const mockHandleSubmit = vi.fn((callback) => (e) => {
        e.preventDefault();
        callback({ email: "test@example.com", password: "Trandanh@1221" })
    })
    const mockOnSubmit = vi.fn();
    const { t } = useTranslation('auth')
    beforeEach(() => {
        vi.clearAllMocks()

        const mockForm = {
            register: vi.fn().mockReturnValue({}),
            handleSubmit: mockHandleSubmit,
            formState: {
                isValid: true,
                errors: {}
            }
        };

        (useLogin as any).mockReturnValue({
            form: mockForm,
            onSubmit: mockOnSubmit,
            isLoading: false,
        })
    })

    it("renders login form", () => {
        render(<Login />, { wrapper: TestWrapper })

        expect(screen.getByLabelText('label.email')).toBeInTheDocument()
        expect(screen.getByLabelText('label.password')).toBeInTheDocument()
        expect(screen.getByRole("button", { name: 'button.login' })).toBeInTheDocument()
        expect(screen.getByText(/label.register_description/i)).toBeInTheDocument()
        expect(screen.getByText('label.register_link')).toBeInTheDocument()
        expect(screen.getByText('label.register_link')).toHaveAttribute("href", "/auth/register")
        expect(screen.getByText('label.forgot_link')).toBeInTheDocument()
        expect(screen.getByText('label.forgot_link')).toHaveAttribute("href", "/auth/forgot-password")
    })

    it('submits the form with email data', async () => {
        vi.clearAllMocks()
        render(<Login />, { wrapper: TestWrapper });

        // Nhập email và submit form
        const emailInput = screen.getByLabelText(/label.email/i);
        const passwordInput = screen.getByLabelText(/label.password/i);
        const form = screen.getByRole('form');

        await act(async () => {
            fireEvent.input(emailInput, { target: { value: 'test@example.com' } });
            fireEvent.input(passwordInput, { target: { value: 'Trandanh@1221' } });
        })


        fireEvent.submit(form);

        // Kiểm tra nếu hàm onSubmit được gọi
        await waitFor(() => {
            expect(mockOnSubmit).toHaveBeenCalledOnce()
            expect(mockOnSubmit).toHaveBeenCalledWith({ email: 'test@example.com', password: 'Trandanh@1221' });
        });
    });

    it('disables the button when form is invalid', () => {
        // Cấu hình mock để form không hợp lệ
        (useLogin as any).mockReturnValue({
            form: {
                register: vi.fn().mockReturnValue({}),
                handleSubmit: mockHandleSubmit,
                formState: {
                    isValid: false,
                    errors: {}
                }
            },
            onSubmit: mockOnSubmit,
            isLoading: false
        });

        render(<Login />, { wrapper: TestWrapper });


        const submitButton = screen.getByRole('button', { name: 'button.login' });
        expect(submitButton).toBeDisabled();
    });

    it('shows loading indicator when isLoading is true', () => {
        // Cấu hình mock để hiển thị trạng thái loading
        (useLogin as any).mockReturnValue({
            form: {
                register: vi.fn().mockReturnValue({}),
                handleSubmit: mockHandleSubmit,
                formState: {
                    isValid: true,
                    errors: {}
                }
            },
            onSubmit: mockOnSubmit,
            isLoading: true
        });

        render(<Login />, { wrapper: TestWrapper });
        expect(screen.queryByText('button.login')).not.toBeInTheDocument();
        const buttonElement = screen.getByRole('button');
        expect(buttonElement.innerHTML).toContain('<div aria-label="Loading">Loading</div>');
    });

    it('displays form errors when present', () => {
        // Cấu hình mock để hiển thị lỗi email
        (useLogin as any).mockReturnValue({
            form: {
                register: vi.fn().mockReturnValue({}),
                handleSubmit: mockHandleSubmit,
                formState: {
                    isValid: false,
                    errors: {
                        email: {
                            message: 'Email is required'
                        }
                    }
                }
            },
            onSubmit: mockOnSubmit,
            isLoading: false
        });

        render(<Login />, { wrapper: TestWrapper });

        expect(screen.getByText('Email is required')).toBeInTheDocument();
    });

});