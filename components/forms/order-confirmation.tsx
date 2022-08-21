import app from '@lib/axios-config'
import db from '@lib/dexie'
import { toastAxiosError } from '@lib/utils'
import { Order } from '@models/order'
import useCheckoutStore from '@stores/checkout'
import styles from '@styles/Checkout.module.css'
import { useLiveQuery } from 'dexie-react-hooks'
import { useRouter } from 'next/router'
import { ChangeEventHandler, FormEventHandler, useState } from 'react'

export const CHECKOUT_SUCCESS_STATE = 'checkout_success'

const OrderConfirmation = () => {
	const [isChecked, setIsChecked] = useState(false)
	const [showMessage, setShowMessage] = useState(false)
	const resetStore = useCheckoutStore(state => state.reset)
	const order: Order = useCheckoutStore(state => ({ details: state.details, delivery: state.delivery }))
	const items = useLiveQuery(() => typeof window == 'undefined' ? [] : db.cartItems.toArray(), [], [])
	const { replace } = useRouter()

	const handleSubmit: FormEventHandler<HTMLFormElement> = async e => {
		e.preventDefault()
		if (!isChecked) {
			setShowMessage(true)
		}

		try {
			await app.post('/api/orders', { ...order, items })
			await db.cartItems.clear()
			replace(`/?state=${CHECKOUT_SUCCESS_STATE}`)
			resetStore()
		} catch (err) {
			toastAxiosError(err)
		}
	}

	const handleChange: ChangeEventHandler<HTMLInputElement> = ({ target: { checked } }) => {
		setIsChecked(checked)
		setShowMessage(!checked)
	}

	return (
		<form onSubmit={handleSubmit}>
			<p>
				Review the order details above, and place your order when you&apos;re ready.
				A confirmation email will be sent to you upon submitting this order.
			</p>
			<div className="flex items-center space-x-2 mt-2">
				<input type="checkbox" id="tandc" checked={isChecked} onChange={handleChange} />
				<label htmlFor="tandc" className="text-base select-none">
					I agree to the <span className="underline">Terms and Conditions</span>
				</label>
			</div>
			<p className={styles.error}>{showMessage && 'Must agree to the terms and conditions'}</p>
			<input type="submit" value="Place Order" className={styles['submit-btn'] + ' mt-3'} />
		</form>
	)
}

export default OrderConfirmation
