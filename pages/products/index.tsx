import dbConnect from '@lib/db'
import { GetStaticPropsContext, InferGetStaticPropsType, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Products from '@models/product'
import { useSession } from 'next-auth/react'
import { TrashIcon } from '@heroicons/react/24/outline'
import { useCallback } from 'react'
import app from '@lib/axios-config'
import { useRouter } from 'next/router'
import { toastAxiosError } from '@lib/utils'

const ProductsPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ products }) => {
	const { status } = useSession()
	const { reload } = useRouter()

	const handleDelete = useCallback(async (id: string) => {
		try {
			await app.delete(`/api/products/${id}`)
			reload()
		} catch (err) {
			toastAxiosError(err)
		}
	}, [reload])

	return (
		<div className="grid gap-x-4 gap-y-8 mt-10 mb-20 sm:grid-cols-2 px-4 container mx-auto max-w-3xl">
			<Head>
				<title>Luntian | Products</title>
			</Head>
			{status == 'authenticated' &&
				<div className="col-span-full justify-self-end">
					<Link href="/products/add">
						<a className="btn green px-4 rounded-sm">
							Add Products
						</a>
					</Link>
				</div>
			}
			{products.map(p =>
				<Link key={p._id} href={`/products/${p._id}`}>
					<a className="cursor-pointer">
						<div className="relative aspect-square w-full">
							<div className="p-1 bg-gray-700 bg-opacity-80 absolute right-2 top-2 z-10 hover:bg-gray-800"
								onClick={e => { e.preventDefault(); handleDelete(p._id) }}>
								<TrashIcon className="aspect-square w-5 text-white" />
							</div>
							<Image src={p.images[0]} alt="An image" layout="fill" />
						</div>
						<h3 className="text-[#79834c] font-bold">{p.name}</h3>
						<p className="text-sm text-gray-600">₱{p.price.toFixed(2)}</p>
					</a>
				</Link>
			)
			}
		</div >
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
