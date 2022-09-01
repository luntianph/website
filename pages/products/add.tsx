import ProductForm from '@components/forms/product-form'
import app from '@lib/axios-config'
import { toastSuccess } from '@lib/toast-defaults'
import { toastAxiosError } from '@lib/utils'
import { ProductSchema } from '@models/product'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'

const Page: NextPage = () => {
	const { push } = useRouter()
	const [isLoading, setIsLoading] = useState(false)

	async function onSubmit(data: ProductSchema) {
		setIsLoading(true)
		try {
			await app.post(`/api/products`, data)
			toastSuccess('Product was successfully added!')
			setTimeout(() => push('/products'), 1000)
		} catch (err) {
			toastAxiosError(err)
			setIsLoading(false)
		}
	}

	return (
		<div className="max-w-2xl mx-auto w-full">
			<h2 className="text-3xl font-normal mt-8 mb-6 max-w">Add Product</h2>
			<ProductForm onSubmit={onSubmit} className="w-full mb-20" isLoading={isLoading} />
		</div>
	)
}

export default Page