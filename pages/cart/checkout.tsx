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
import { Disclosure, Transition } from '@headlessui/react'
import OrderConfirmation from '@components/forms/order-confirmation'
import useCheckoutStore from '@stores/checkout'

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
	const step = useCheckoutStore(state => state.step)
	const edit = useCheckoutStore(state => state.edit)
	const setEdit = useCheckoutStore(state => state.setEdit)

	const STEPS = useMemo(() => [
		{ title: 'Shipping Details', component: ShippingDetails },
		{ title: 'Delivery Method', component: DeliveryMethods },
		{ title: 'Review and Order Placement', component: OrderConfirmation },
	], [])

	return (
		<div className="container mx-auto px-4 sm:px-0 mb-24 mt-10">
			<Head>
				<title>Luntian | Checkout</title>
			</Head>
			<div className="grid grid-cols-[4fr_3fr] max-w-5xl mx-auto gap-x-8">
				<div className={styles.forms}>
					{STEPS.map(({ title, component }, i) => (
						<>
							<Disclosure key={title}>
								{() => (
									<>
										<div className="flex justify-between items-center">
											<h2 className={styles.heading}>{i + 1} {title}</h2>
											{
												i == edit ?
													<button className="underline cursor-pointer" onClick={() => setEdit(-1)}>Close</button>
													:
													i < step &&
													<button className="underline cursor-pointer" onClick={() => setEdit(i)}>Edit details</button>
											}
										</div>
										<Transition
											show={i <= step || i == edit}
											enter="transition duration-100 ease-out"
											enterFrom="transform scale-95 opacity-0"
											enterTo="transform scale-100 opacity-100"
											leave="transition duration-75 ease-out"
											leaveFrom="transform scale-100 opacity-100"
											leaveTo="transform scale-95 opacity-0"
										>
											<Disclosure.Panel static>
												{component({ index: i })}
											</Disclosure.Panel>
										</Transition>
									</>
								)}
							</Disclosure>
							<hr />
						</>
					))}
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
		</div >
	)
}

export default CheckoutPage
