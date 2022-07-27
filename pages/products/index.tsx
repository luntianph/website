import dbConnect from '@lib/db'
import { GetStaticPropsContext, InferGetStaticPropsType, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Products from '@models/product'

const ProductsPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ products }) => {
	return (
		<div className="grid gap-x-4 gap-y-8 mt-10 mb-20 sm:grid-cols-2 px-4 container mx-auto max-w-3xl">
			<Head>
				<title>Luntian | Products</title>
			</Head>
			{products.map(p =>
				<Link key={p._id} href={`/products/${p._id}`}>
					<a className="cursor-pointer">
						<div className="relative aspect-square w-full">
							<Image src={p.images[0]} alt="An image" layout="fill" />
						</div>
						<h3 className="text-[#79834c] font-bold">{p.name}</h3>
						<p className="text-sm text-gray-600">₱{p.price.toFixed(2)}</p>
					</a>
				</Link>
			)}
		</div>
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
