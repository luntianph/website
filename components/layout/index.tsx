import Head from 'next/head'
import { useRouter } from 'next/router'
import { FC, ReactNode } from 'react'
import Header from './header'
import { useSession } from 'next-auth/react'
import URLs from '@lib/urls'
import Image from 'next/image'

export const siteTitle = 'Luntian'

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
	const { data: session } = useSession()
	const { pathname } = useRouter()

	return (
		<>
			<Head>
				<link rel="icon" href="/favicon.ico" />
				<title>{siteTitle}</title>
				<meta
					name="description"
					content="You one-stop sustainable packaging shop. Be part of the 1%!"
				/>
				<meta
					property="og:image"
					content={`https://og-image.vercel.app/${encodeURI(
						siteTitle
					)}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
				/>
				<meta name="theme-color" content="#0370be" />
				<meta name="og:title" content={siteTitle} />
				<meta name="twitter:card" content="summary_large_image" />
			</Head>
			<Header />
			<main className="h-main grid">
				{children}
			</main>
			<footer className="bg-[#E6dECA] px-4 md:px-8 py-8">
				<div className="grid place-items-center min-h-full mx-auto container">
					<p className="text-2xl sm:text-4xl text-center font-basteleur font-extrabold text-[#61966A] mb-1">Lunas ang Tinig ng Animo</p>
					<p className="text-lg text-center font-bold text-[#BD7B70] mb-2">Your one-stop sustainable packaging shop.</p>
					<div className="grid grid-flow-col gap-x-3 text-4xl items-center">
						<a href={URLs.facebook}>
							<Image src="/brands/fb.png" alt="Facebook" width={39} height={39} />
						</a>
						<a href={URLs.ig}>
							<Image src="/brands/ig.png" alt="Instagram" width={39} height={39} />
						</a>
						<a href={URLs.tiktok}>
							<Image src="/brands/tiktok.png" alt="Tiktok" width={39} height={39} />
						</a>
					</div>
				</div>
			</footer>
		</>
	)
}

export default Layout
