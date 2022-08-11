import { FC } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Disclosure, Transition } from '@headlessui/react'
import { MenuIcon, XIcon, ShoppingBagIcon, ShoppingCartIcon } from '@heroicons/react/outline'
import cn from 'classnames'
import { matchPath } from '@lib/utils'

interface NavItemProp {
	text: string
	path: string
	isHome?: boolean
}

interface MobNavItemProp extends NavItemProp {
	onClick: () => void
}

const navItems: NavItemProp[] = [
	{ path: '/', text: 'Home', isHome: true },
	{ path: '/about', text: 'Our Story' },
	{ path: '/products', text: 'Products' },
	{ path: '/faqs', text: 'FAQs' },
	{ path: '/composting', text: 'Composting' },
	{ path: '/contact-us', text: 'Contact Us' },
]

const MobNavItem: FC<MobNavItemProp> = ({ text, path, isHome, onClick }) => {
	const { pathname } = useRouter()
	const isMatch = matchPath(pathname, path, isHome)

	const className = cn({
		'border-green-500 text-gray-900 bg-gray-100 text-green-700': isMatch,
		'border-transparent text-gray-500 hover:text-gray-900 hover:bg-gray-50': !isMatch,
	}, 'border-l-4 block px-3 py-2 text-base font-medium cursor-pointer transition-colors')

	return (
		<Link href={path}>
			<a className={className} aria-current={pathname == path ? 'page' : undefined} onClick={onClick}>{text}</a>
		</Link>
	)
}

const NavItem: FC<NavItemProp> = ({ text, path, isHome }) => {
	const { pathname } = useRouter()
	const isMatch = matchPath(pathname, path, isHome)

	const className = cn({
		'border-green-700 text-gray-900 ': isMatch,
		'border-transparent text-gray-500 hover:text-gray-900': !isMatch,
	}, 'h-full border-b-2 inline-flex justify-center items-center cursor-pointer')

	return (
		<Link href={path} passHref>
			<div className={className}>
				<p className="px-3 py-2 font-medium" aria-current={path == pathname ? 'page' : undefined}>{text}</p>
			</div>
		</Link>
	)
}

const Header: FC = () => {
	return (
		<header className="h-16 lg:px-2 border-b bg-white border-gray-200 relative z-50">
			<Disclosure as="nav" className="bg-white h-full">
				{({ open, close }) => (
					<>
						<div className="container mx-auto px-2 lg:px-0 h-full">
							<div className="relative flex items-center justify-between h-full">
								<div className="absolute inset-y-0 left-0 flex items-center lg:hidden">
									<Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
										<span className="sr-only">Open main menu</span>
										{open ? <XIcon className="block h-6 w-6" aria-hidden="true" /> : <MenuIcon className="block h-6 w-6" aria-hidden="true" />}
									</Disclosure.Button>
								</div>
								<div className="flex items-center h-full justify-center lg:items-stretch lg:justify-start">
									<Link href="/">
										<a className="flex-shrink-0 -mb-1 flex items-center cursor-pointer font-basteleur text-green-700 text-2xl">
											LUNTIAN
										</a>
									</Link>
									<div className="hidden lg:block lg:ml-6">
										<div className="flex space-x-4 items-center h-full">
											{navItems.map(nav => <NavItem key={nav.text} text={nav.text} path={nav.path} isHome={nav.isHome} />)}
										</div>
									</div>
								</div>
								<Link href="/cart">
									<a>
										<ShoppingCartIcon
											className="w-6 aspect-square cursor-pointer hover:text-green-700 active:text-green-800 select-none"
										/>
									</a>
								</Link>
							</div>
						</div>

						<Transition
							enter="transition duration-100 ease-out"
							enterFrom="transform scale-95 opacity-0"
							enterTo="transform scale-100 opacity-100"
							leave="transition duration-75 ease-out"
							leaveFrom="transform scale-100 opacity-100"
							leaveTo="transform scale-95 opacity-0"
						>
							<Disclosure.Panel className="lg:hidden relative bg-white">
								<div className="px-2 pt-2 pb-3 space-y-1">
									{navItems.map(nav => <MobNavItem key={nav.text} text={nav.text} path={nav.path} isHome={nav.isHome} onClick={close} />)}
								</div>
							</Disclosure.Panel>
						</Transition>
					</>
				)}
			</Disclosure>
		</header>
	)
}

export default Header
