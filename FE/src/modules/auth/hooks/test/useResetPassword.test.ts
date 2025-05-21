import { act, renderHook, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useResetPassword } from "../useResetPassword.hook";
import { TestWrapper } from "@/test/TestWrapper";
const mutateMock = vi.fn()
vi.mock("@auth/flows/ropc/ropc.service", () => ({
    useResetPasswordSvc: () => ({
        mutate: mutateMock,
        isPending: false
    })
}))
const code = "test"
describe("useRegister", () => {
    it("should render form with initdata", () => {
        const { result } = renderHook(() => useResetPassword(code), { wrapper: ({ children }) => TestWrapper({ children }) })
        expect(result.current.form.getValues()).toEqual({ password: "", confirmPassword: "", code: code })
    })

    it("should block submit with invalid data", async () => {
        const { result } = renderHook(() => useResetPassword(code), { wrapper: ({ children }) => TestWrapper({ children }) })
        act(() => {
            result.current.form.setValue("password", "invalid-password", { shouldValidate: true })
            result.current.form.setValue("confirmPassword", "invalid-confirm-password", { shouldValidate: true })
            result.current.form.trigger()
        })
        await waitFor(() => {
            expect(result.current.form.formState.isValid).toBe(false)
            expect(result.current.form.formState.errors.password).toBeDefined()
            expect(result.current.form.formState.errors.confirmPassword).toBeDefined()
        })
    })
    it("should submit mutate with valid form data", async () => {
        const { result } = renderHook(() => useResetPassword(code), { wrapper: ({ children }) => TestWrapper({ children }) })

        const validPassword = "Trandanh@1212"

        act(() => {
            result.current.form.setValue("password", validPassword, { shouldValidate: true })
            result.current.form.setValue("confirmPassword", validPassword, { shouldValidate: true })
        })

        act(() => {
            result.current.onSubmit({ password: validPassword, confirmPassword: validPassword })
        })
        await waitFor(() => {
            expect(result.current.form.formState.isValid).toBe(true)
        })
        expect(mutateMock).toHaveBeenCalledOnce()
        expect(mutateMock).toHaveBeenCalledWith(
            { password: validPassword, confirmPassword: validPassword },
            expect.objectContaining({
                onSuccess: expect.any(Function),
                onError: expect.any(Function)
            })
        )
    })
})