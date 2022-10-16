import { GetStaticPaths, GetStaticPropsContext, InferGetStaticPropsType, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/future/image'
import { useRouter } from 'next/router'
import Accordion from '@components/accordion'
import { FormEventHandler, useEffect, useState } from 'react'
import { ShoppingCartIcon } from '@heroicons/react/24/outline'
import { getProduct } from '@pages/api/products/[id]'
import db from '@lib/dexie'
import DebouncedNumbericInput from '@components/debounced-numeric-input'
import cn from 'classnames'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { getProductIds } from '@lib/products'
import LoadingSpinner from '@components/loading-spinner'

const ProductPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ product }) => {
	const { query: { id }, isFallback, replace } = useRouter()
	const { data: sessionData } = useSession()
	const [idx, setIdx] = useState(0)
	const [quantity, setQuantity] = useState(1)
	const [hasAdded, setHasAdded] = useState(false)

	useEffect(() => {
		if (hasAdded) {
			const timeout = setTimeout(() => setHasAdded(false), 2000)
			return () => clearTimeout(timeout)
		}
	}, [hasAdded, setHasAdded])

	const handleQuantityChange = (value: number) => setQuantity(value >= 1 ? value : 1)

	const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
		e.preventDefault()
		if (typeof id != 'string') return

		// attempt to find an existing entry and modify it
		const count = await db.cartItems.where('id').equals(id).modify((entry) => {
			entry.quantity += quantity
		})

		if (count == 0) {
			await db.cartItems.add({
				id,
				quantity,
			})
		}

		setHasAdded(true)
	}

	if (isFallback) {
		return <LoadingSpinner />
	} else if (!product) {
		replace('/404')
		return <LoadingSpinner />
	}

	return (
		<div className="max-w-4xl grid sm:px-4 sm:grid-cols-[7fr_5fr] mx-auto sm:pt-10 mb-20 gap-6">
			<Head>
				<title>Luntian | Product</title>
			</Head>
			{sessionData &&
				<div className="col-span-full justify-self-end">
					<Link href={`/products/${id}/edit`}>
						<a className="btn green px-4 rounded-sm">Edit</a>
					</Link>
				</div>
			}
			<div className="relative">
				<Image src={product.images[idx]} alt={product.name} className="w-full" width={490} height={490} />
				<div className="flex !space-x-1 mt-2 bg-gray-200">
					{product.images.map((i, idx) => (
						<div key={i} onClick={() => setIdx(idx)} tabIndex={0}
							className="relative cursor-pointer outline outline-2 outline-transparent focus:outline-green-700 
								hover:outline-green-400 w-20 aspect-square"
						>
							<Image src={i} alt={`${product.name}-${idx}`} fill />
						</div>
					))}
				</div>
			</div>
			<div className="px-4 sm:px-0">
				<div className="mb-12">
					<h1 className="lg:text-3xl text-2xl font-basteleur text-green-500">{product.name}</h1>
					<h5 className="text-lg text-gray-700">₱{product.price.toFixed(2)}</h5>
					<form className="my-4" onSubmit={handleSubmit}>
						<div className="flex items-center space-x-4 mb-2">
							<p className="text-sm">Quantity</p>
							<DebouncedNumbericInput className="w-24" value={quantity} min={1} onChange={handleQuantityChange} required />
						</div>
						<button type="submit"
							className="rounded-md px-4 py-2 flex items-center bg-[#AE633F] hover:bg-[#915539] text-white font-semibold">
							Add to cart
							<ShoppingCartIcon className="w-5 ml-2" />
						</button>
						<p className={cn('transition-opacity duration-1000 text-[#AE633F]', hasAdded ? 'opacity-100' : 'opacity-0')}>
							Added to your cart!
						</p>
					</form>
				</div>
				<Accordion summary="Product details" className="mb-2" open={true}>
					<div className="transition-all">
						<p className="font-semibold">Package includes: {product.includes}</p>
						<p>Measurements: {product.measurements}</p>
						<p>Color: {product.color}</p>
					</div>
				</Accordion>
				<hr className="my-4 sm:my-6 border-gray-500" />
				<Accordion summary="NOTE" open>
					<p className="before:content-['📌']">{product.companyConditions}</p>
				</Accordion>
			</div>
			<div className="px-4 sm:px-0">
				<h6 className="font-semibold mb-2">Materials:</h6>
				<ul className="space-y-8">
					{product.materials.items.map((m, i) =>
						<li key={i}><p className="before:content-['🌿_']">{m[0]}</p>
							<ul>
								{Array.isArray(m[1]) && m[1].map((item: string, j) =>
									<li key={j}><p className="before:content-['—']">{item}</p></li>
								)}
							</ul>
						</li>
					)}
				</ul>
				<p className="mt-8">Composting duration: {product.compostingDuration}</p>
			</div>
		</div>
	)
}

export default ProductPage

export const getStaticPaths: GetStaticPaths = async () => {
	const paths = await getProductIds()

	return {
		paths,
		fallback: true
	}
}

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
	const product = await getProduct(params?.id as string)

	return {
		props: {
			product
		},
		notFound: !product,
	}
}
