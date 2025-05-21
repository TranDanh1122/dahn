import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Register from '../Register.view';
import { useRegister } from '@auth/hooks/useRegister.hook';
import { TestWrapper } from '@/test/TestWrapper';
import { useTranslation } from 'react-i18next';

// Mock cho useForgotPassword hook
vi.mock('@auth/hooks/useRegister.hook', () => ({
    useRegister: vi.fn()
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
        callback({ email: 'test@example.com', password: "Trandanh@1221", confirmPassword: "Trandanh@1221" });
    });

    const mockOnSubmit = vi.fn();
    const {t} = useTranslation('auth')
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

        (useRegister as any).mockReturnValue({
            form: mockForm,
            onSubmit: mockOnSubmit,
            isLoading: false
        });
    });

    it('renders the register form', () => {
        render(<Register />, { wrapper: TestWrapper })

        // Kiểm tra các phần tử cơ bản có hiển thị
        expect(screen.getByLabelText('label.email')).toBeInTheDocument()
        expect(screen.getByLabelText('label.password')).toBeInTheDocument()
        expect(screen.getByLabelText('label.confirm_password')).toBeInTheDocument()

        expect(screen.getByText('button.register')).toBeInTheDocument()
        expect(screen.getByText(/label.login_description/i)).toBeInTheDocument()
        expect(screen.getByText(/label.login_link/i)).toBeInTheDocument()
        expect(screen.getByText(/label.login_link/i)).toHaveAttribute("href" , '/auth/login')
    });

    it('submits the form with email data', async () => {
        render(<Register />, { wrapper: TestWrapper });


        // Nhập email và submit form
        const emailInput = screen.getByLabelText(/label.email/i);
        const passwordInput = screen.getByLabelText('label.password');
        const confirmPasswordInput = screen.getByLabelText('label.confirm_password');

        const form = screen.getByRole('form');

        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'Trandanh@1221' } });
        fireEvent.change(confirmPasswordInput, { target: { value: 'Trandanh@1221' } });

        fireEvent.submit(form)

        // Kiểm tra nếu hàm onSubmit được gọi
        await waitFor(() => {
            expect(mockOnSubmit).toHaveBeenCalledWith({ email: 'test@example.com', password: 'Trandanh@1221' , confirmPassword: 'Trandanh@1221' });
            expect(mockOnSubmit).toHaveBeenCalledOnce();
        });
    });

    it('disables the button when form is invalid', () => {
        // Cấu hình mock để form không hợp lệ
        (useRegister as any).mockReturnValue({
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

        render(<Register />, { wrapper: TestWrapper });


        const submitButton = screen.getByText('button.register');
        expect(submitButton).toBeDisabled();
    });

    it('shows loading indicator when isLoading is true', () => {
        // Cấu hình mock để hiển thị trạng thái loading
        (useRegister as any).mockReturnValue({
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

        render(<Register />, { wrapper: TestWrapper });
        expect(screen.queryByText('button.register')).not.toBeInTheDocument();

        // Thay vào đó, hiển thị component Loading
        const buttonElement = screen.getByRole('button');
        expect(buttonElement.innerHTML).toContain('<div aria-label="Loading">Loading</div>');
    });

    it('displays form errors when present', () => {
        // Cấu hình mock để hiển thị lỗi email
        (useRegister as any).mockReturnValue({
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

        render(<Register />, { wrapper: TestWrapper });

        expect(screen.getByText('Email is required')).toBeInTheDocument();
    });

});