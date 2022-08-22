import Modal from '@components/modal'
import { Dialog } from '@headlessui/react'
import app from '@lib/axios-config'
import db from '@lib/dexie'
import { toastAxiosError } from '@lib/utils'
import { Order } from '@models/order'
import useCheckoutStore from '@stores/checkout'
import styles from '@styles/Checkout.module.css'
import { useLiveQuery } from 'dexie-react-hooks'
import { useRouter } from 'next/router'
import { ChangeEventHandler, FormEventHandler, MouseEventHandler, useState } from 'react'
import modalStyles from '@styles/Modal.module.css'

export const CHECKOUT_SUCCESS_STATE = 'checkout_success'

const OrderConfirmation = () => {
	const [isChecked, setIsChecked] = useState(false)
	const [showMessage, setShowMessage] = useState(false)
	const resetStore = useCheckoutStore(state => state.reset)
	const order: Order = useCheckoutStore(state => ({ details: state.details, delivery: state.delivery }))
	const items = useLiveQuery(() => typeof window == 'undefined' ? [] : db.cartItems.toArray(), [], [])
	const { replace } = useRouter()
	const [isOpen, setIsOpen] = useState(false)

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

	const openModal: MouseEventHandler = e => {
		e.preventDefault()
		setIsOpen(true)
	}

	return (
		<>
			<Modal isOpen={isOpen} close={() => setIsOpen(false)}>
				<div className={modalStyles.panel}>
					<div className={modalStyles.body}>
						<Dialog.Title as="h3" className={modalStyles.title}>Terms and Conditions</Dialog.Title>
						<div className="font-normal text-sm space-y-2">
							<p>
								<b>MAKE READING A HABIT 🥰.</b> Kindly read everything in the terms and conditions before proceeding with your order. The accomplishment of the form serves as a confirmation that you are ordering and paying for the products that you have ordered.
							</p>
							<p>
								<b>PRIVATE MESSAGES ARE ALWAYS OPEN.</b> Feel free to message us in our social media platform if you have inquiries about our company, product, and your order. We will try to reply as fast as possible!
							</p>
							<p>
								<b>WE ARE NOT LIABLE FOR DAMAGES OR DENTS CAUSED BY THE COURIER.</b> We will be thoroughly checking the products for any tears and dents and will be photographing the products before the ship-out. Thus, any damages/dents occurred due to shipping.
							</p>
							<p>
								<b>NO VIDEO UNBOXING = NO REFUND.</b> We highly recommend you to film your unboxing as we will strictly not fo refunds/returns/exchange unless show proof of video from the start of unboxing of the video in the event that there is negligence on LUNTIAN&apos;s part.
							</p>
						</div>
					</div>
					<div className={modalStyles.footer}>
						<button className={modalStyles.btn} onClick={() => setIsOpen(false)}>Close</button>
					</div>
				</div>
			</Modal>
			<form onSubmit={handleSubmit}>
				<p>
					Review the order details above, and place your order when you&apos;re ready.
					A confirmation email will be sent to you upon submitting this order.
				</p>
				<div className="flex items-center space-x-2 mt-2">
					<input type="checkbox" id="tandc" checked={isChecked} onChange={handleChange} />
					<label htmlFor="tandc" className="text-base select-none">
						I agree to the <span className="underline cursor-pointer" onClick={openModal}>Terms and Conditions</span>
					</label>
				</div>
				<p className={styles.error}>{showMessage && 'Must agree to the terms and conditions'}</p>
				<input type="submit" value="Place Order" className={styles['submit-btn'] + ' mt-3'} />
			</form>
		</>
	)
}

export default OrderConfirmation
