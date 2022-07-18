import { toast, ToastOptions } from 'react-toastify'

export const toastErrorConfig: ToastOptions = {
	position: "top-right",
	autoClose: 5000,
	hideProgressBar: false,
	closeOnClick: true,
	pauseOnHover: true,
	draggable: true,
	progress: undefined,
}

export const toastSuccessConfig: ToastOptions = {
	position: "top-right",
	autoClose: 5000,
	hideProgressBar: false,
	closeOnClick: true,
	pauseOnHover: true,
	draggable: true,
	progress: undefined,
}

export function toastSuccess(message: string) {
	toast.success(message, toastSuccessConfig)
}

export function toastError(message: string) {
	toast.error(message, toastErrorConfig)
}
