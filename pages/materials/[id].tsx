import MaterialForm from '@components/forms/materials/form'
import LoadingSpinner from '@components/loading-spinner'
import app from '@lib/axios-config'
import dbConnect from '@lib/db'
import { toastSuccess } from '@lib/toast-defaults'
import { toastAxiosError } from '@lib/utils'
import Material, { MaterialSchema } from '@models/material'
import { GetStaticPaths, GetStaticPropsContext, InferGetStaticPropsType, NextPage } from 'next'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useState } from 'react'

const Page: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ material }) => {
	const { replace, isFallback, query, push } = useRouter()
	const { status } = useSession({
		required: true,
		onUnauthenticated() {
			replace('/?error=Unauthorized user')
		},
	})
	const [isLoading, setIsLoading] = useState(false)

	async function onSubmit(data: MaterialSchema) {
		setIsLoading(true)
		try {
			await app.put(`/api/materials/${query.id}`, data)
			toastSuccess('Material updated')
			push('/materials')
		} catch (err) {
			toastAxiosError(err)
		}
		setIsLoading(false)
	}

	if (status == 'loading' || isFallback) {
		return <LoadingSpinner />
	}

	return (
		<div className="max-w-2xl mx-auto w-full px-4 md:px-0">
			<h2 className="text-3xl font-normal mt-8 mb-6 max-w">Edit Material</h2>
			<MaterialForm material={material} onSubmit={onSubmit} className="w-full mb-20" isLoading={isLoading} />
		</div>
	)
}

export default Page

export const getStaticPaths: GetStaticPaths = async () => {
	await dbConnect()
	const paths = (await Material.find({}, '_id').lean())
		.map(item => ({
			params: {
				id: item._id.toString(),
				locale: 'en'
			}
		}))

	return {
		paths,
		fallback: true
	}
}


export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
	await dbConnect()
	const material = await Material.findById(params?.id, '-_id').lean()

	return {
		props: {
			material: material as unknown as MaterialSchema,
		},
		notFound: !material,
	}
}
