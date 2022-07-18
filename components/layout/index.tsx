import Head from 'next/head'
import { useRouter } from 'next/router'
import { FC, ReactNode } from 'react'
import Header from './header'
import { useSession } from 'next-auth/react'

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
			<footer className="text-gray-500 h-20 md:h-30 px-4 md:px-8">
				<div className="flex justify-between items-center min-h-full mx-auto container">
					<div>
						<p className="md:text-lg text-sm font-medium">Lunas ang Tinig ng Animo<br /> </p>
						<p className="text-sm">Your one-stop sustainable packaging shop.</p>
					</div>
					<div>
						<a className="footer-icon" title="Luntian Facebook Page" href="https://www.facebook.com/pts.dlsu/">
							<i className="fa-brands fa-facebook fa-xl"></i>
						</a>
						<a className="footer-icon" title="Luntian Twitter Profile" href="https://twitter.com/ptsdlsu">
							<i className="fa-brands fa-twitter fa-xl"></i>
						</a>
						<a className="footer-icon" title="Luntian Email Address" href="mailto:pts@dlsu.edu.ph">
							<i className="fa-solid fa-envelope fa-xl"></i>
						</a>
					</div>
				</div>
			</footer>
		</>
	)
}

export default Layout
