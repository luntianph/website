import ProductForm from '@components/forms/product-form'
import LoadingSpinner from '@components/loading-spinner'
import app from '@lib/axios-config'
import dbConnect from '@lib/db'
import { getProductIds } from '@lib/products'
import { toastSuccess } from '@lib/toast-defaults'
import { toastAxiosError } from '@lib/utils'
import Product, { ProductSchema } from '@models/product'
import { GetStaticPaths, GetStaticPropsContext, InferGetStaticPropsType, NextPage } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'

const Page: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ product }) => {
	const { query: { id }, push, isFallback } = useRouter()
	const [isLoading, setIsLoading] = useState(false)

	async function onSubmit(data: ProductSchema) {
		setIsLoading(true)
		try {
			await app.put(`/api/products/${id}`, data)
			push('/products')
			toastSuccess('Product was successfully updated!')
		} catch (err) {
			toastAxiosError(err)
		}
		setIsLoading(false)
	}

	if (isFallback) {
		return <LoadingSpinner />
	}

	return (
		<div className="max-w-2xl mx-auto w-full">
			<h2 className="text-3xl font-normal mt-8 mb-6 max-w">Edit Product</h2>
			<ProductForm onSubmit={onSubmit} product={product} className="w-full mb-20" isLoading={isLoading} />
		</div>
	)
}

export default Page

export const getStaticPaths: GetStaticPaths = async () => {
	const paths = await getProductIds()

	return {
		paths,
		fallback: true
	}
}

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
	await dbConnect()
	const product = (await Product.findById(params?.id, '-_id -__v').lean()) as ProductSchema

	if (product) {
		product.materials = product.materials.toString()
	}

	return {
		props: {
			product,
		},
		notFound: !product
	}
}
