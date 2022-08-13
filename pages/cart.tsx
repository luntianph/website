import app from '@lib/axios-config'
import db, { CartItem } from '@lib/dexie'
import { useLiveQuery } from 'dexie-react-hooks'
import { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useMemo, useRef, useState } from 'react'
import useSWRImmutable from 'swr/immutable'
import { LeanAPIProduct } from './api/products/[id]'
import { XIcon } from '@heroicons/react/outline'
import LoadingSpinner from '@components/loading-spinner'
import Link from 'next/link'
import DebouncedNumbericInput from '@components/debounced-numeric-input'

const fetcher = ({ id }: CartItem) => app.get<LeanAPIProduct>(`/api/products/${id}?mode=lean`).then(res => res.data)

function useCartItems(cartItems: CartItem[]) {
	const { data, error, mutate, isValidating } = useSWRImmutable(cartItems.length ? 'cart' : null, () => Promise.all(cartItems.map(fetcher)))
	const [map, setMap] = useState<Map<string, LeanAPIProduct>>(new Map<string, LeanAPIProduct>())

	useEffect(() => {
		if (isValidating || !data) return

		let allFound = true

		for (let i = 0; i < cartItems.length; i++) {
			if (!map.get(cartItems[i].id)) {
				allFound = false
				break
			}
		}

		if (allFound) return

		mutate().then(() => {
			const map = new Map<string, LeanAPIProduct>()
			for (let i = 0; i < data.length; i++) {
				map.set(cartItems[i].id, data[i])
			}
			setMap(map)
		})
	}, [setMap, map, cartItems, data, mutate, isValidating])

	return {
		data: map,
		isLoading: !data && !error,
		error,
		mutate,
	}
}

async function handleQuantityChange(id: string, quantity: number) {
	if (isNaN(quantity) || quantity < 1) return

	// prevent modification, this also prevents the component from infinitely rerendering
	const item = await db.cartItems.get(id)
	if (item?.quantity == quantity) return

	await db.cartItems.put({
		id,
		quantity
	}, id)
}

const Cart: NextPage = () => {
	const ref = useRef<HTMLFormElement>(null)
	const [isMounted, setIsMounted] = useState(false)
	const cartItems = useLiveQuery(() => isMounted ? db.cartItems.toArray() : [], [isMounted], [] as CartItem[])
	const { data: items, isLoading, mutate } = useCartItems(cartItems)
	const sum = useMemo(() => cartItems.reduce((sum, { id, quantity }) => {
		return sum + (items.get(id)?.price ?? 0) * quantity
	}, 0), [items, cartItems])

	useEffect(() => { setIsMounted(true) }, [])

	async function handleDelete(id: string) {
		await db.cartItems.delete(id)
	}

	return (
		<>
			<div className="w-full h-[20vh] absolute bg-[url('/bg-photo.jpg')] bg-no-repeat bg-cover bg-[#BBB880] bg-blend-multiply opacity-75" />
			<div className="container mx-auto px-4 sm:px-0 mt-[calc(20vh+32px)] mb-24 relative z-10">
				<Head>
					<title>Luntian | Cart</title>
				</Head>
				<div className="grid md:grid-cols-[14fr_5fr] max-w-4xl mx-auto gap-x-4">
					<form ref={ref}>
						<h3 className="font-medium text-3xl">My Cart</h3>
						<hr />
						{cartItems.length == 0 ?
							<div className="h-full flex justify-center items-center flex-col">
								<h1 className="text-2xl font-medium opacity-50">No items yet.</h1>
								<Link href="/products">
									<a className="text-green-500 hover:underline hover:text-green-700">View our products here</a>
								</Link>
							</div> :
							isLoading ? <LoadingSpinner /> :
								cartItems?.map(({ id, quantity }) =>
									<div key={id} className="flex p-2 space-x-4">
										<div className="grid place-items-center">
											<Image src={items.get(id)?.image || '/logo.png'} alt="shop item" width={100} height={100} />
										</div>
										<div className="grid grid-cols-2 flex-1">
											<div>
												<p className="font-bold leading-5 text-left">{items.get(id)?.name}</p>
												<p className="font-semibold text-gray-500">₱{items.get(id)?.price.toFixed(2)}</p>
												<p className="font-semibold text-gray-500">Color: {items.get(id)?.color}</p>
											</div>
											<div className="flex flex-col items-end">
												<DebouncedNumbericInput
													className="text-center w-24 appearance-none"
													value={quantity}
													onChange={quantity => handleQuantityChange(id, quantity)}
												/>
												<p className="font-bold text-right">₱{((items.get(id)?.price ?? 0) * quantity).toFixed(2)}</p>
											</div>
										</div>
										<XIcon className="w-4 h-4 cursor-pointer mt-4 hover:text-red-700" onClick={() => handleDelete(id)} />
									</div>
								)}
					</form>
					<div className="flex flex-col items-end">
						<h3 className="text-3xl font-medium mb-2">Total:</h3>
						<h3 className="text-4xl mb-1.5">₱{sum.toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 2 })}</h3>
						<button className="btn green px-4" disabled={cartItems.length == 0}>Checkout</button>
					</div>
				</div>
			</div >
		</>
	)
}

export default Cart
