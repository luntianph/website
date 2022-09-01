import dbConnect from '@lib/db'
import { GetStaticPropsContext, InferGetStaticPropsType, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Products from '@models/product'
import { useSession } from 'next-auth/react'
import { TrashIcon } from '@heroicons/react/24/outline'
import { useCallback, useState } from 'react'
import app from '@lib/axios-config'
import { useRouter } from 'next/router'
import { toastAxiosError } from '@lib/utils'
import ConfirmationModal from '@components/modal/confirmation-modal'

const ProductsPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ products }) => {
	const { status } = useSession()
	const { reload } = useRouter()
	const [selection, setSelection] = useState('')

	async function handleDelete() {
		try {
			await app.delete(`/api/products/${selection}`)
			reload()
		} catch (err) {
			toastAxiosError(err)
		}
	}

	return (
		<>
			<ConfirmationModal
				isOpen={selection != ''}
				onClose={() => setSelection('')}
				onActionClick={handleDelete}
				message="Delete product?"
			/>
			<div className="grid gap-x-4 gap-y-8 mt-10 mb-20 sm:grid-cols-2 px-4 container mx-auto max-w-3xl">
				<Head>
					<title>Luntian | Products</title>
				</Head>
				{status == 'authenticated' &&
					<div className="col-span-full justify-self-end space-x-2">
						<Link href="/products/add">
							<a className="btn green px-3 py-2 rounded-sm">
								Add Products
							</a>
						</Link>
						<Link href="/materials">
							<a className="btn green px-3 py-2 rounded-sm">
								Edit Materials
							</a>
						</Link>
					</div>
				}
				{products.map(p =>
					<Link key={p._id} href={`/products/${p._id}`}>
						<a className="cursor-pointer">
							<div className="relative aspect-square w-full">
								{status == 'authenticated' &&
									<div className="p-1 bg-gray-700 bg-opacity-80 absolute right-2 top-2 z-10 hover:bg-gray-800"
										onClick={e => { e.preventDefault(); setSelection(p._id) }}>
										<TrashIcon className="aspect-square w-5 text-white" />
									</div>
								}
								<Image src={p.images[0]} alt="An image" layout="fill" />
							</div>
							<h3 className="text-[#79834c] font-bold">{p.name}</h3>
							<p className="text-sm text-gray-600">₱{p.price.toFixed(2)}</p>
						</a>
					</Link>
				)
				}
			</div >
		</>
	)
}

export const getStaticProps = async ({ }: GetStaticPropsContext) => {
	await dbConnect()
	const products = await Products.find({}, 'name price images').lean()
	products.forEach(p => p._id = p._id.toString())

	return {
		props: {
			products
		}
	}
}

export default ProductsPage
