import ProductForm from '@components/forms/product-form'
import app from '@lib/axios-config'
import dbConnect from '@lib/db'
import { getProductIds } from '@lib/products'
import Product, { IProduct, ProductSchema } from '@models/product'
import { GetStaticPaths, GetStaticPropsContext, InferGetStaticPropsType, NextPage } from 'next'
import { useRouter } from 'next/router'

const Page: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ product }) => {
	const { query: { id } } = useRouter()

	async function onSubmit(data: ProductSchema) {
		await app.put(`/api/products/${id}`, data)
	}

	return (
		<div className="max-w-2xl mx-auto w-full">
			<h2 className="text-3xl font-normal mt-8 mb-6 max-w">Edit Product</h2>
			<ProductForm onSubmit={onSubmit} product={product} className="w-full mb-20" />
		</div>
	)
}

export default Page

export const getStaticPaths: GetStaticPaths = async () => {
	const paths = await getProductIds()

	return {
		paths,
		fallback: false
	}
}

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
	await dbConnect()
	const product = (await Product.findById(params?.id, '-_id -__v').lean()) as ProductSchema
	product.materials = product?.materials.toString()

	return {
		props: {
			product,
		}
	}
}
