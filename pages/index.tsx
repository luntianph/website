import type { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import styles from '@styles/Home.module.css'
import { ChevronRightIcon } from '@heroicons/react/outline'
import { useEffect, useState } from 'react'
import Modal from '@components/modal'
import modalStyles from '@styles/Modal.module.css'
import { string, object, InferType } from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Carousel from '@components/carousel'
import { XCircleIcon } from '@heroicons/react/solid'
import { toastError, toastSuccess } from '@lib/toast-defaults'
import app from '@lib/axios-config'
import axios from 'axios'

const formSchema = object({
	email: string().email('Invalid email format!').required('Email is required!')
})

const modalKey = 'newsletterModal'
const dateKey = 'visit'

type FormSchema = InferType<typeof formSchema>

const Home: NextPage = () => {
	const { register, handleSubmit, formState: { errors } } = useForm<FormSchema>({
		resolver: yupResolver(formSchema)
	})
	const [isOpen, setIsOpen] = useState(false)

	async function onSubmit(data: FormSchema) {
		try {
			await app.post('/api/subscribers', data)
			setIsOpen(false)
			toastSuccess('You have successfully signed up for our newsletter!')
		} catch (e) {
			if (axios.isAxiosError(e)) {
				toastError(e?.response?.data as string)
			}
		}
	}

	// shows modal only once in a week
	useEffect(() => {
		const time = localStorage.getItem(dateKey)
		if (time == null) {
			localStorage.setItem(dateKey, new Date().getTime().toString())
		} else {
			if (new Date().getTime() - Number(time) > 604800) {
				localStorage.removeItem(modalKey)
			}
		}

		// shows modal in 5 seconds
		const timer = setTimeout(() => {
			if (localStorage.getItem(modalKey) == null) {
				setIsOpen(true)
				localStorage.setItem(modalKey, 'true')
			}
		}, 5000)
		return () => clearTimeout(timer)
	}, [])

	return (
		<>
			<Modal isOpen={isOpen} close={() => setIsOpen(false)}>
				<div className={modalStyles.panel}>
					<div className="grid sm:grid-cols-2">
						<div className="p-8">
							<XCircleIcon className="w-6 sm:hidden aspect-square absolute top-4 right-4 z-10 text-black cursor-pointer hover:text-green-800"
								onClick={() => setIsOpen(false)} />
							<h1 className="text-[#5A8367] text-4xl font-bold">Get our latest updates and releases right to your inbox</h1>
							<p className="mt-2 mb-6">Subscribe to our newsletter to receive 10% discount on your first order and win exciting prizes too!</p>
							<form onSubmit={handleSubmit(onSubmit)}>
								<label htmlFor="email">Enter your email here</label>
								<input type="email" id="email" {...register('email')} />
								<p className="form-err-msg">{errors.email?.message}</p>
								<input type="submit" value="Sign Up"
									className="w-full border-2 mt-2 font-semibold border-gray-600 rounded-full p-1 cursor-pointer"
								/>
							</form>
						</div>
						<div className="hidden sm:block relative translate-x-1">
							<XCircleIcon className="w-6 aspect-square absolute top-4 right-4 z-10 text-black cursor-pointer hover:text-green-800"
								onClick={() => setIsOpen(false)} />
							<Image src="/modal-photo.jpg" layout="fill" objectFit="cover" objectPosition="right" alt="Luntian mailers" />
						</div>
					</div>
				</div>
			</Modal>
			<div className="grid h-min gap-y-16 lg:mt-10 mb-20">
				<section>
					<div className="max-w-4xl mx-auto">
						<Carousel images={[
							{ url: '/carousel/3.png', alt: 'Din', width: 980, height: 472 },
							{ url: '/carousel/2.png', alt: 'Din', width: 980, height: 472 },
							{ url: '/carousel/1.png', alt: 'A plant', width: 980, height: 472 },
						]} />
					</div>
				</section>
				<section className="flex justify-center px-4">
					<div className="grid place-items-center md:grid-flow-col gap-8">
						<div className="p-6 aspect-square rounded-full bg-green-500 justify-center">
							<Image src="/small-mailer.png" alt="Small mailer" width={200} height={200} />
						</div>
						<div>
							<h4 className="text-2xl text-brown-800 mb-3">Introducing:</h4>
							<h3 className="font-basteleur text-yellow-500 text-3xl mb-3">1% Compostable Kraft Bubble Mailer</h3>
							<p className="max-w-prose text-sm text-brown-400 text-justify">
								First-ever in the Philippines. The 1% Compostable Bubble Mailers are your perfect and
								sustainable alternative to harmful packaging plastics such as bubble wraps, tapes, saran wrap,
								and more that takes 20 to 500 years to decompose! Make the switch today for you, others, and Mama🌏.
							</p>
							<div className="flex justify-end">
								<button>Learn More</button>
							</div>
						</div>
					</div>
				</section>

				<section className="relative">
					<div className="w-full h-full absolute bg-[url('/bg-photo.jpg')] bg-no-repeat bg-cover bg-[#BBB880] bg-blend-multiply opacity-75" />
					<div className="grid place-items-center max-w-xl mx-auto gap-y-6 py-12 px-4 relative z-10">
						<h1 className="font-basteleur text-white text-6xl mb-4 text-shadow">Shop Now!</h1>
						<Link href="/products">
							<a className={styles['link-btn'] + ' group'}>
								<span>Our Products</span>
								<ChevronRightIcon className="w-4 group-hover:translate-x-2 transition-transform" />
							</a>
						</Link>
						<a className={styles['link-btn'] + ' group'}>
							<span>Non-Shopee Checkout</span>
							<ChevronRightIcon className="w-4 group-hover:translate-x-2 transition-transform" />
						</a>
						<a className={styles['link-btn'] + ' group'}>
							<span>Shopee Checkout</span>
							<ChevronRightIcon className="w-4 group-hover:translate-x-2 transition-transform" />
						</a>
					</div>
				</section>
			</div>
		</>
	)
}

export default Home
