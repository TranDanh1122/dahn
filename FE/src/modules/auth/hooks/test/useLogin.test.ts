import { renderHook, act, waitFor } from "@testing-library/react";
import { describe, it, vi, expect } from "vitest";
import { useLogin } from "../useLogin.hook";

const mutationMock = vi.fn()
vi.mock("@auth/flows/ropc/ropc.service", () => ({
    useLoginSvc: () => ({
        mutate: mutationMock,
        isPending: false
    })
})
)
describe("useLogin hook", () => {
    it("should render form with init data", () => {
        const { result } = renderHook(() => useLogin())
        expect(result.current.form.getValues()).toStrictEqual({ email: "", password: "" })
    })
    it("should block submit with invalid data", async () => {
        const { result } = renderHook(() => useLogin())
        act(() => {
            result.current.form.setValue("email", "invalid-email", {
                shouldValidate: true
            })

            result.current.form.trigger()

        })
        await waitFor(() => {
            expect(result.current.form.formState.isValid).toBe(false)
            expect(result.current.form.formState.errors.email).toBeDefined()
            expect(result.current.form.formState.errors.password).toBeDefined()
        })
    })
    it("should submit mutate with valid form data", async () => {
        vi.clearAllMocks()
        const { result } = renderHook(() => useLogin())
        const validEmail = "trandanh14042000@gmail.com"
        act(() => {
            result.current.form.setValue("email", validEmail, { shouldValidate: true })
            result.current.form.setValue("password", "Trandanh@1212", { shouldValidate: true })
        })

        await waitFor(() => {
            expect(result.current.form.formState.isValid).toBe(true)
        })
        await act(async () => {
            result.current.onSubmit({ email: validEmail, password: "Trandanh@1212" })
        })

        expect(mutationMock).toHaveBeenCalledOnce()
        expect(mutationMock).toBeCalledWith({ email: validEmail, password: "Trandanh@1212" }, expect.objectContaining({
            onSuccess: expect.any(Function)
        }))

    })

    it("should pending", () => {
        vi.clearAllMocks()
        vi.mock("@auth/flows/ropc/ropc.service", () => ({
            useLoginSvc: () => ({
                mutate: mutationMock,
                isPending: true
            })
        })
        )
        const { result } = renderHook(() => useLogin())
        expect(result.current.isLoading).toBe(true)
    })
})