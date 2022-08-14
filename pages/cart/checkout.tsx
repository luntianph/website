import ShippingDetails from '@components/forms/shipping-details'
import db, { CartItem } from '@lib/dexie'
import { useLiveQuery } from 'dexie-react-hooks'
import { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import useSWRImmutable from 'swr/immutable'
import { fetcher } from '.'
import LoadingSpinner from '@components/loading-spinner'
import { useMemo } from 'react'
import DeliveryMethods from '@components/forms/delivery-methods'
import styles from '@styles/Checkout.module.css'

function useCartItems(cartItems: CartItem[]) {
	const { data, error } = useSWRImmutable(cartItems.length ? 'cart' : null, () => Promise.all(cartItems.map(fetcher)))

	return {
		data,
		isLoading: !data && !error,
		isError: !!error,
	}
}


const CheckoutPage: NextPage = () => {
	const cartItems = useLiveQuery(() => typeof window == 'undefined' ? [] : db.cartItems.toArray(), [], [] as CartItem[])
	const { data: items, isLoading } = useCartItems(cartItems)
	const sum = useMemo(() => cartItems.reduce((sum, { id, quantity }, i) => {
		return sum + (items?.[i].price ?? 0) * quantity
	}, 0), [items, cartItems])

	return (
		<div className="container mx-auto px-4 sm:px-0 mb-24 mt-10">
			<Head>
				<title>Luntian | Checkout</title>
			</Head>
			<div className="grid grid-cols-[4fr_3fr] max-w-5xl mx-auto gap-x-8">
				<div className={styles.forms}>
					<h2 className={styles.heading}>1 Shipping Details</h2>
					<ShippingDetails />
					<hr />
					<h2 className={styles.heading}>2 Delivery Method</h2>
					<DeliveryMethods />
					<hr />
					<h2 className={styles.heading}>3 Review and Order Placement</h2>
					<div>
						<p>
							Review the order details above, and place your order when you&apos;re ready.
							A confirmation email will be sent to you upon submitting this order.
						</p>
						<div className="flex items-center space-x-2 my-2">
							<input type="checkbox" id="tandc" />
							<label htmlFor="tandc" className="text-base">I agree to the <span className="underline">Terms and Conditions</span></label>
						</div>
						<input type="submit" value="Place Order" className={styles['submit-btn'] + ' mt-1'} />
					</div>
				</div>
				<div>
					<div className="bg-gray-200 px-6 py-4 sticky top-10">
						<div className="flex justify-between items-center mb-4">
							<h3 className="text-lg font-semibold">Order Summary</h3>
							<Link href="/cart">
								<a className="underline text-sm">Edit Cart</a>
							</Link>
						</div>
						{isLoading || !items ?
							<LoadingSpinner />
							:
							cartItems.map(({ id, quantity }, i) => (
								<div key={id} className="flex space-x-2 text-sm">
									<Image src={items[i].image} alt="Shopping Item" width={80} height={80} />
									<div className="flex-1">
										<p className="text-left leading-4 mb-1">{items[i].name}</p>
										<p>Qty: {quantity}</p>
										<p>Color: {items[i].color}</p>
									</div>
									<p>₱{(items[i].price * quantity).toFixed(2).toLocaleString()}</p>
								</div>
							))
						}
						<hr className="border-gray-400 mb-6 mt-4" />
						<div className="flex justify-between text-xl font-semibold">
							<p>Total</p>
							<p>₱{sum.toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 2 })}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default CheckoutPage
