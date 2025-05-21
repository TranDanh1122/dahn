import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ResetPassword from '../ResetPassword.view';
import { useResetPassword } from '@auth/hooks/useResetPassword.hook';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Mock cho useForgotPassword hook
vi.mock('@auth/hooks/useResetPassword.hook', () => ({
    useResetPassword: vi.fn()
}));
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key:string) => key,
    i18n: {
      changeLanguage: vi.fn(),
      language: 'en',
    },
  }),
}));
describe('Register Component', () => {
    const mockHandleSubmit = vi.fn((callback) => (e) => {
        e.preventDefault();
        callback({ password: "Trandanh@1221", confirmPassword: "Trandanh@1221" });
    });
    const {t} = useTranslation('auth')
    const mockOnSubmit = vi.fn();
    const routes = [
        {
            path: '/',
            element: <ResetPassword />,
            loader: () => ({ code: 'test' }),
        },
    ];

    const router = createMemoryRouter(routes, {
        initialEntries: ['/'],
    });
    beforeEach(() => {
        vi.clearAllMocks();

        const mockForm = {
            register: vi.fn().mockReturnValue({}),
            handleSubmit: mockHandleSubmit,
            formState: {
                isValid: true,
                errors: {}
            }
        };

        (useResetPassword as any).mockReturnValue({
            form: mockForm,
            onSubmit: mockOnSubmit,
            isLoading: false
        });

    });

    it('renders the reset password form', () => {
        render(<RouterProvider router={router} />)

        // Kiểm tra các phần tử cơ bản có hiển thị
        expect(screen.getByLabelText(t("label.password"))).toBeInTheDocument()
        expect(screen.getByLabelText(t("label.confirm_password"))).toBeInTheDocument()
        expect(screen.getByText(t("button.resetPassword"))).toBeInTheDocument()
    });

    it('submits the form with data', async () => {
        render(<RouterProvider router={router} />);


        // Nhập email và submit form
        const passwordInput = screen.getByLabelText(t("label.password"));
        const confirmPasswordInput = screen.getByLabelText(t("label.confirm_password"));

        const form = screen.getByRole('form');

        fireEvent.change(passwordInput, { target: { value: 'Trandanh@1221' } });
        fireEvent.change(confirmPasswordInput, { target: { value: 'Trandanh@1221' } });

        fireEvent.submit(form)

        // Kiểm tra nếu hàm onSubmit được gọi
        await waitFor(() => {
            expect(mockOnSubmit).toHaveBeenCalledWith({ password: 'Trandanh@1221', confirmPassword: 'Trandanh@1221' });
            expect(mockOnSubmit).toHaveBeenCalledOnce();
        });
    });

    it('disables the button when form is invalid', () => {
        // Cấu hình mock để form không hợp lệ
        (useResetPassword as any).mockReturnValue({
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

        render(<RouterProvider router={router} />);


        const submitButton = screen.getByText(t("button.resetPassword"));
        expect(submitButton).toBeDisabled();
    });

    it('shows loading indicator when isLoading is true', () => {
        // Cấu hình mock để hiển thị trạng thái loading
        (useResetPassword as any).mockReturnValue({
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

        render(<RouterProvider router={router} />);
        expect(screen.queryByText(t("button.resetPassword"))).not.toBeInTheDocument();

        // Thay vào đó, hiển thị component Loading
        const buttonElement = screen.getByRole('button');
        expect(buttonElement.innerHTML).toContain('<div aria-label="Loading">Loading</div>');
    });

    it('displays form errors when present', () => {
        // Cấu hình mock để hiển thị lỗi email
        (useResetPassword as any).mockReturnValue({
            form: {
                register: vi.fn().mockReturnValue({}),
                handleSubmit: mockHandleSubmit,
                formState: {
                    isValid: false,
                    errors: {
                        password: {
                            message: 'password is required'
                        }
                    }
                }
            },
            onSubmit: mockOnSubmit,
            isLoading: false
        });

        render(<RouterProvider router={router} />);

        expect(screen.getByText('password is required')).toBeInTheDocument();
    });

});