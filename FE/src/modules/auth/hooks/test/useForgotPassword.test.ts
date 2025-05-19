import { renderHook, act, waitFor } from "@testing-library/react";
import { useForgotPassword } from "../useForgotPassword.hook"
import { describe, expect, it, vi } from "vitest";
const mutationMock = vi.fn()
vi.mock("@auth/flows/ropc/ropc.service", () => ({
    useForgotPasswordSvc: () => ({
        mutate: mutationMock,
        isPending: false
    })
}))

describe("useForgotPassword", () => {

    it("should render form with init value", () => {
        const { result } = renderHook(() => useForgotPassword())
        expect(result.current.form.getValues()).toEqual({ email: "" })
    })

    it("should block submit with invalid value", async () => {
        const { result } = renderHook(() => useForgotPassword())
        act(() => {
            result.current.form.setValue("email", "invalid-email", {
                shouldValidate: true
            })
        })
        await waitFor(() => {
            expect(result.current.form.formState.isValid).toBe(false)
        })

    })

    it("should submit mutate with valid form data", async () => {
        const { result } = renderHook(() => useForgotPassword())
        const validEmail = "trandanh14042000@gmail.com"
        act(() => {
            result.current.form.setValue("email", validEmail, { shouldValidate: true })
        })

        await waitFor(() => {
            expect(result.current.form.formState.isValid).toBe(true)
        })

        act(() => {
            result.current.onSubmit({ email: validEmail })
        })
        expect(mutationMock).toHaveBeenCalledOnce()
        expect(mutationMock).toHaveBeenCalledWith({ email: validEmail },
            expect.objectContaining(
                {
                    onError: expect.any(Function),
                    // onSuccess: expect.any(Function)
                }
            )
        )
    })
    it("should loading", () => {
        vi.clearAllMocks()
        vi.mock("@auth/flows/ropc/ropc.service", () => ({
            useForgotPasswordSvc: () => ({
                mutate: mutationMock,
                isPending: true
            })
        }))
        const { result } = renderHook(() => useForgotPassword())
        expect(result.current.isLoading).toBe(true)
    })
})