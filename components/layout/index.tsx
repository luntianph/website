import Head from 'next/head'
import { useRouter } from 'next/router'
import { FC, ReactNode } from 'react'
import Header from './header'
import { useSession } from 'next-auth/react'
import URLs from '@lib/urls'

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
			<footer className="bg-green-400 px-4 md:px-8 py-4">
				<div className="grid place-items-center min-h-full mx-auto container">
					<p className="text-2xl text-center font-extrabold text-brown-700 mb-1">Be part of the 1%.</p>
					<p className="text-2xl text-center font-basteleur text-green-800 mb-2">Your one-stop sustainable packaging shop.</p>
					<div className="contents text-brown-400 text-xl font-extrabold">
						<div>
							<a className="footer-link" title="Luntian Facebook" href={URLs.facebook}>FB</a>
							<a className="footer-link" title="Luntian Tiktok" href={URLs.tiktok}> TikTok</a>
							<a className="footer-link" title="Luntian Instagram" href={URLs.ig}> IG</a>
							<span>: @luntianofficialph</span>
						</div>
						<a href={URLs.shopee} className="footer-link">Shopee: @luntiancompanyph</a>
					</div>
				</div>
			</footer>
		</>
	)
}

export default Layout
