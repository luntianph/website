import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { IShippingDetails, shippingDetailsSchema } from '@models/order'
import styles from '@styles/Checkout.module.css'
import FORM_SELECTORS, { CheckoutFormProp } from '.'
import useCheckoutStore from '@stores/checkout'
import shallow from 'zustand/shallow'

export default function ShippingDetails({ index }: CheckoutFormProp) {
	const { edit, step, incrementStep, setEdit } = useCheckoutStore(FORM_SELECTORS, shallow)
	const [details, setDetails] = useCheckoutStore(state => [state.details, state.setDetails], shallow)

	const { register, handleSubmit, formState: { errors } } = useForm<IShippingDetails>({
		resolver: yupResolver(shippingDetailsSchema),
		defaultValues: details,
	})

	function onSubmit(data: IShippingDetails) {
		setDetails(data)

		if (index == step) {
			incrementStep()
		} else {
			setEdit(-1)
		}
	}

	if (index == step || index == edit) {
		return (
			<form onSubmit={handleSubmit(onSubmit)} className="space-y-1">
				<div>
					<label htmlFor="email" className="required">Email</label>
					<input type="email" id="email" {...register('email')} />
					<p className={styles.error}>{errors.email?.message}</p>
				</div>
				<div>
					<label htmlFor="first-name" className="required">First Name</label>
					<input type="text" id="first-name" {...register('firstName')} />
					<p className={styles.error}>{errors.firstName?.message}</p>
				</div>
				<div>
					<label htmlFor="last-name" className="required">Last Name</label>
					<input type="text" id="last-name" {...register('lastName')} />
					<p className={styles.error}>{errors.lastName?.message}</p>
				</div>
				<div>
					<label htmlFor="contact" className="required">Contact Number</label>
					<input type="number" id="contact" {...register('contactNumber')} className="appearance-none" placeholder="Ex: 09123456789" min={0} />
					<p className={styles.error}>{errors.contactNumber?.message}</p>
				</div>
				<div>
					<label htmlFor="last-name" className="required">Address</label>
					<input type="text" id="last-name" {...register('address')} />
					<p className={styles.error}>{errors.address?.message}</p>
				</div>
				<input className={styles['submit-btn']} type="submit" value={index == step ? 'Continue' : 'Save'} />
			</form>
		)
	}

	// all details are filled
	if (!Object.values(details).find((data) => data == '')) {
		return (
			<div>
				<p>Email: <span className="font-semibold">{details.email}</span></p>
				<p>Name: <span className="font-semibold">{details.firstName} {details.lastName}</span></p>
				<p>Contact Number: <span className="font-semibold">{details.contactNumber}</span></p>
				<p>Address: <span className="font-semibold">{details.address}</span></p>
			</div>
		)
	}

	return <></>
}