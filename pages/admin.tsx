import LoadingSpinner from '@components/loading-spinner'
import { NextPage } from 'next'
import { signIn } from 'next-auth/react'

const Page: NextPage = () => {
	signIn('google', { callbackUrl: '/products' })
	return <LoadingSpinner />
}

export default Page
