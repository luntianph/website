import { CheckoutStore } from '@stores/checkout'

export type CheckoutFormProp = {
	index: number
}

const FORM_SELECTORS = (state: CheckoutStore) => ({
	edit: state.edit,
	step: state.step,
	incrementStep: state.incrementStep,
	setEdit: state.setEdit,
})

export default FORM_SELECTORS

