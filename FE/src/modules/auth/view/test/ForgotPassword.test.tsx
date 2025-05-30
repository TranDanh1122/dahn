import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ForgotPassword from '../ForgotPassword.view';
import { useForgotPassword } from '@auth/hooks/useForgotPassword.hook';
import { TestWrapper } from '@/test/TestWrapper';
import { useTranslation } from 'react-i18next';

// Mock cho useForgotPassword hook
vi.mock('@auth/hooks/useForgotPassword.hook', () => ({
    useForgotPassword: vi.fn()
}));
vi.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key: string) => key,
        i18n: {
            changeLanguage: vi.fn(),
            language: 'en',
        },
    }),
}));
describe('ForgotPassword Component', () => {
    const mockHandleSubmit = vi.fn((callback) => (e) => {
        e.preventDefault();
        callback({ email: 'test@example.com' });
    });

    const mockOnSubmit = vi.fn();
    const { t } = useTranslation('auth');
    beforeEach(() => {
        vi.clearAllMocks();

        // Cấu hình mock mặc định cho useForgotPassword
        const mockForm = {
            register: vi.fn().mockReturnValue({}),
            handleSubmit: mockHandleSubmit,
            formState: {
                isValid: true,
                errors: {}
            }
        };

        (useForgotPassword as any).mockReturnValue({
            form: mockForm,
            onSubmit: mockOnSubmit,
            isLoading: false
        });
    });

    it('renders the forgot password form', () => {
        render(<ForgotPassword />, { wrapper: TestWrapper });


        // Kiểm tra các phần tử cơ bản có hiển thị
        expect(screen.getByLabelText('label.email')).toBeInTheDocument();
        expect(screen.getByText('button.forgot')).toBeInTheDocument();
        expect(screen.getByText(/label.login_description/i)).toBeInTheDocument();
        expect(screen.getByText(/label.login_link/i)).toBeInTheDocument();
    });

    it('submits the form with email data', async () => {
        render(<ForgotPassword />, { wrapper: TestWrapper });


        // Nhập email và submit form
        const emailInput = screen.getByLabelText(/Email/i);
        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

        const submitButton = screen.getByText('button.forgot');
        fireEvent.click(submitButton);

        // Kiểm tra nếu hàm onSubmit được gọi
        await waitFor(() => {
            expect(mockOnSubmit).toHaveBeenCalledWith({ email: 'test@example.com' });
        });
    });

    it('disables the button when form is invalid', () => {
        // Cấu hình mock để form không hợp lệ
        (useForgotPassword as any).mockReturnValue({
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

        render(<ForgotPassword />, { wrapper: TestWrapper });


        const submitButton = screen.getByText('button.forgot');
        expect(submitButton).toBeDisabled();
    });

    it('shows loading indicator when isLoading is true', () => {
        // Cấu hình mock để hiển thị trạng thái loading
        (useForgotPassword as any).mockReturnValue({
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

        render(<ForgotPassword />, { wrapper: TestWrapper });
        expect(screen.queryByText('button.forgot')).not.toBeInTheDocument();

        // Thay vào đó, hiển thị component Loading
        const buttonElement = screen.getByRole('button');
        expect(buttonElement.innerHTML).toContain('<div aria-label="Loading">Loading</div>'); // Giả định Loading component hiển thị một phần tử với tên "loading"
    });

    it('displays form errors when present', () => {
        // Cấu hình mock để hiển thị lỗi email
        (useForgotPassword as any).mockReturnValue({
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

        render(<ForgotPassword />, { wrapper: TestWrapper });

        expect(screen.getByText('Email is required')).toBeInTheDocument();
    });

});