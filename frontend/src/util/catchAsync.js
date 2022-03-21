import displayApiError from "./displayApiError";

export default function catchAsync(fn) {
    return () => {
        fn().catch(err => {
            displayApiError(err?.response?.data?.message || "Something went wrong!")
        })
    }
}