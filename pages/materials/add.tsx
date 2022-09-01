import MaterialForm from '@components/forms/materials/form'
import LoadingSpinner from '@components/loading-spinner'
import app from '@lib/axios-config'
import { toastSuccess } from '@lib/toast-defaults'
import { toastAxiosError } from '@lib/utils'
import { MaterialSchema } from '@models/material'
import { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useState } from 'react'

const Page: NextPage = () => {
	const { replace, push } = useRouter()
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
			await app.post('/api/materials', data)
			toastSuccess('New material added')
			push('/materials')
		} catch (err) {
			toastAxiosError(err)
		}
		setIsLoading(false)
	}

	if (status == 'loading') {
		return <LoadingSpinner />
	}

	return (
		<div className="max-w-2xl mx-auto w-full px-4 md:px-0">
			<h2 className="text-3xl font-normal mt-8 mb-6 max-w">Add Material</h2>
			<MaterialForm onSubmit={onSubmit} className="w-full mb-20" isLoading={isLoading} />
		</div>
	)
}

export default Page
