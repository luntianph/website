import { NextPage } from 'next'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import Head from 'next/head'
import app from '@lib/axios-config'
import { toastError, toastSuccess } from '@lib/toast-defaults'

export const contactSchema = yup.object({
	name: yup.string().trim().required('Name is required!'),
	email: yup.string().email().required('Email is required!'),
	phone: yup.string().optional().matches(/09\d{9}/, { excludeEmptyString: true, message: 'Invalid contact number!' }),
	body: yup.string().trim().required('Message is required!'),
})

export type ContactSchema = yup.InferType<typeof contactSchema>

const ContactUs: NextPage = () => {
	const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactSchema>({
		resolver: yupResolver(contactSchema)
	})

	async function onSubmit(data: ContactSchema) {
		try {
			await app.post('/api/contact-us', data)
			reset()
			toastSuccess('Email sent!')
		} catch {
			toastError('A server-side error has occured. Please try again later.')
		}
	}

	return (
		<div className="container mx-auto place-self-center px-4 sm:px-0 mt-6 sm:mt-0">
			<Head>
				<title>Contact Us | Luntian</title>
			</Head>

			<form className="max-w-xl grid gap-y-2 mx-auto" onSubmit={handleSubmit(onSubmit)}>
				<h2 className="text-center font-basteleur text-green-700 text-3xl">Contact Us</h2>
				<div>
					<label className="required" htmlFor="name">Name</label>
					<input type="text" id="name" {...register('name')} />
					<p className="form-err-msg text-sm">{errors.name?.message}</p>
				</div>
				<div>
					<label className="required" htmlFor="name">Email</label>
					<input type="email" id="email" {...register('email')} />
					<p className="form-err-msg text-sm">{errors.email?.message}</p>
				</div>
				<div>
					<label htmlFor="name">Phone</label>
					<input type="tel" id="phone" {...register('phone')} placeholder="09XXXXXXXXX" />
					<p className="form-err-msg text-sm">{errors.phone?.message}</p>
				</div>
				<div>
					<label className="required" htmlFor="body">Message</label>
					<textarea id="body" rows={5} {...register('body')}></textarea>
					<p className="form-err-msg text-sm">{errors.body?.message}</p>
				</div>
				<input className="btn green" type="submit" value="Submit" />
			</form>
		</div>
	)
}

export default ContactUs
