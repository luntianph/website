import { IDeliveryMethod, IShippingDetails } from '@models/order'
import create from 'zustand'

export type CheckoutStore = {
	details: IShippingDetails
	delivery: IDeliveryMethod
	step: number
	edit: number
	setDetails: (details: IShippingDetails) => void
	setDelivery: (delivery: IDeliveryMethod) => void
	incrementStep: () => void
	setEdit: (step: number) => void
	reset: () => void
}

const INITIAL = {
	details: {
		email: '',
		firstName: '',
		lastName: '',
		address: '',
		contactNumber: '',
		igLink: undefined,
	},
	delivery: {
		method: ''
	},
	step: 0,
	edit: -1,
} as const

const useCheckoutStore = create<CheckoutStore>(set => ({
	...INITIAL,
	setDetails: (details) => set({ details }),
	setDelivery: (delivery) => set({ delivery }),
	incrementStep: () => set(state => ({ step: state.step + 1 })),
	setEdit: (step: number) => set({ edit: step }),
	reset: () => set(() => INITIAL)
}))

export default useCheckoutStore
