import { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import useRetriever from '@lib/useRetriever'
import { useRouter } from 'next/router'
import Accordion from '@components/accordion'
import { useState } from 'react'
import LoadingSpinner from '@components/loading-spinner'
import { ShoppingCartIcon } from '@heroicons/react/outline'
import { APIProduct } from '@pages/api/products/[id]'

const ProductPage: NextPage = () => {
	const { query: { id } } = useRouter()
	const { data: product, isLoading }
		= useRetriever<APIProduct>(id ? `/api/products/${id}` : null)
	const [idx, setIdx] = useState(0)

	if (isLoading || !product) {
		return (
			<LoadingSpinner />
		)
	}

	return (
		<>
			<Head>
				<title>Luntian | Products</title>
			</Head>
			<div className="max-w-4xl grid sm:px-4 sm:grid-cols-[7fr_5fr] mx-auto sm:pt-10 mb-20 gap-6">
				<div className="relative">
					<Image src={product.images[idx]} alt={product.name} layout="responsive" width={100} height={100} />
					<div className="flex !space-x-1 mt-2 bg-gray-200">
						{product.images.map((i, idx) => (
							<div key={i} onClick={() => setIdx(idx)} tabIndex={0}
								className="relative cursor-pointer outline outline-2 outline-transparent focus:outline-green-700 
								hover:outline-green-400 w-20 aspect-square"
							>
								<Image src={i} alt={`${product.name}-${idx}`} layout="fill" />
							</div>
						))}
					</div>
				</div>
				<div className="px-4 sm:px-0">
					<h1 className="lg:text-3xl text-2xl font-basteleur text-green-500">{product.name}</h1>
					<div className="flex justify-between items-center mt-4 mb-10">
						<h5 className="text-lg text-gray-700">₱{product.price.toFixed(2)}</h5>
						<button className="rounded-md px-4 py-2 flex items-center bg-[#AE633F] hover:bg-[#915539] text-white font-semibold">
							Shop Now
							<ShoppingCartIcon className="w-5 ml-2" />
						</button>
					</div>
					<Accordion summary="Product details" className="mb-2" open>
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
		</>
	)
}

export default ProductPage
