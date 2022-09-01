import LoadingSpinner from '@components/loading-spinner'
import ConfirmationModal from '@components/modal/confirmation-modal'
import { PlusIcon, TrashIcon } from '@heroicons/react/20/solid'
import app from '@lib/axios-config'
import { useRetriever } from '@lib/useRetriever'
import { toastAxiosError } from '@lib/utils'
import { IMaterial } from '@models/material'
import { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useCallback, useState } from 'react'

const Page: NextPage = () => {
	const { data, mutate } = useRetriever<IMaterial[]>('/api/materials', [])
	const { replace } = useRouter()
	const { status } = useSession({
		required: true,
		onUnauthenticated() {
			replace('/?error=Unauthorized user')
		},
	})
	const [selected, setSelected] = useState('')

	async function deleteMaterial() {
		if (!selected) return

		try {
			await app.delete(`/api/materials/${selected}`)
			await mutate()
			setSelected('')
		} catch (err) {
			toastAxiosError(err)
		}
	}

	if (status == 'loading' || !data) {
		return <LoadingSpinner />
	}

	return (
		<>
			<ConfirmationModal
				isOpen={selected != ''}
				onClose={() => setSelected('')}
				onActionClick={deleteMaterial}
				message="Delete material?"
			/>
			<div className="container mx-auto pt-10 px-4">
				<h2 className="text-2xl mb-2">Materials</h2>
				<div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4">
					{data.map(item => (
						<Link key={item._id.toString()} href={`/materials/${item._id}`}>
							<a className="rounded-md py-2 px-4 shadow bg-white hover:bg-gray-50 active:bg-gray-100 cursor-pointer flex justify-between" >
								<p className="select-none">{item.name}</p>
								<TrashIcon className="aspect-square w-5 hover:text-red-700 transition-colors"
									onClick={e => { e.preventDefault(); setSelected(item._id.toString()) }} />
							</a>
						</Link>
					))}
					<Link href="/materials/add">
						<a className="flex items-center space-x-2 px-4 border border-gray-300 rounded text-gray-600 hover:bg-gray-200 transition-colors">
							<PlusIcon className="w-5 aspect-square" />
							<span>Add Material</span>
						</a>
					</Link>
				</div>
			</div>
		</>
	)
}

export default Page
