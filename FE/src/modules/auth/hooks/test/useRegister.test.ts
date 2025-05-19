import { act, renderHook, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useRegister } from "../useRegister.hook";
import { TestWrapper } from "@/test/TestWrapper";
const mutateMock = vi.fn()
vi.mock("@auth/flows/ropc/ropc.service", () => ({
    useRegisterSvc: () => ({
        mutate: mutateMock,
        isPending: false
    })
}))
describe("useRegister", () => {
    it("should render form with initdata", () => {
        const { result } = renderHook(() => useRegister(), {wrapper: ({ children }) => TestWrapper({ children }) })
        expect(result.current.form.getValues()).toEqual({ email: "", password: "", confirmPassword: "" })
    })

    it("should block submit with invalid data", async () => {
        const { result } = renderHook(() => useRegister(), {wrapper: ({ children }) => TestWrapper({ children }) })
        act(() => {
            result.current.form.setValue("email", "invalid-email", { shouldValidate: true })
            result.current.form.setValue("password", "invalid-password", { shouldValidate: true })
            result.current.form.setValue("confirmPassword", "invalid-confirm-password", { shouldValidate: true })
            result.current.form.trigger()
        })
        await waitFor(() => {
            expect(result.current.form.formState.isValid).toBe(false)
            expect(result.current.form.formState.errors.email).toBeDefined()
            expect(result.current.form.formState.errors.password).toBeDefined()
            // expect(result.current.form.formState.errors.confirmPassword).toBeDefined()
        })
    })
    it("should submit mutate with valid form data", async () => {
        const { result } = renderHook(() => useRegister(), { wrapper: ({ children }) => TestWrapper({ children }) })

        const validEmail = "trandanh14042000@gmail.com"
        const validPassword = "Trandanh@1212"

        act(() => {
            result.current.form.setValue("email", validEmail, { shouldValidate: true })
            result.current.form.setValue("password", validPassword, { shouldValidate: true })
            result.current.form.setValue("confirmPassword", validPassword, { shouldValidate: true })
        })

        act(() => {
            result.current.onSubmit({ email: validEmail, password: validPassword, confirmPassword: validPassword })
        })
        await waitFor(() => {
            expect(result.current.form.formState.isValid).toBe(true)
        })
        expect(mutateMock).toHaveBeenCalledOnce()
        expect(mutateMock).toHaveBeenCalledWith(
            { email: validEmail, password: validPassword, confirmPassword: validPassword },
            expect.objectContaining({
                onSuccess: expect.any(Function)
            })
        )
    })
})