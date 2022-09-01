import '../styles/globals.css'
import 'react-toastify/dist/ReactToastify.min.css'
import type { AppProps } from 'next/app'
import Layout from '../components/layout'
import { SessionProvider } from 'next-auth/react'
import { ToastContainer } from 'react-toastify'
import { useEffect, useState } from 'react'

function MyApp({
	Component,
	pageProps: { session, ...pageProps }
}: AppProps) {
	const [isLoading, setIsLoading] = useState(true)
	useEffect(() => {
		setIsLoading(false)
	}, [setIsLoading])

	if (isLoading) {
		return (
			<div className="grid h-screen w-screen place-items-center">
				<h1 className="flex-shrink-0 -mb-1 flex items-center
				 font-basteleur text-green-700 text-5xl sm:text-6xl -mt-8 sm:-mt-16 animate-fadeIn">
					LUNTIAN
				</h1>
			</div>
		)
	}

	return (
		<SessionProvider session={session}>
			<Layout>
				<Component {...pageProps} />
			</Layout>
			<ToastContainer />
		</SessionProvider>
	)
}

export default MyApp
