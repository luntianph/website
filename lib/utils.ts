import axios from 'axios'
import { toast } from 'react-toastify'
import { toastErrorConfig } from './toast-defaults'

export function matchPath(pathname: string, route: string, isHome?: boolean) {
	return isHome ? pathname === route : pathname.startsWith(route)
}

/**
 * Used to show the error message in a toast
 * @param error - an error object of unknown type
 */
export function toastAxiosError(error: unknown) {
	if (axios.isAxiosError(error)) {
		toast.error(error.message, toastErrorConfig)
	}
}
