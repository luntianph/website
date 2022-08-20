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
					<label htmlFor="ig">Instagram Account</label>
					<input type="text" id="ig" {...register('igLink')} />
					<p className={styles.error}>{errors.igLink?.message}</p>
				</div>
				<div>
					<label htmlFor="contact" className="required">Contact Number</label>
					<input type="number" id="contact" {...register('contactNumber')} className="appearance-none" placeholder="Ex: 09123456789" min={0} />
					<p className={styles.error}>{errors.contactNumber?.message}</p>
				</div>
				<div>
					<label htmlFor="address" className="required">Full Address</label>
					<input type="text" id="address" {...register('address')} />
					<p className={styles.error}>{errors.address?.message}</p>
				</div>
				<div>
					<label htmlFor="city" className="required">City</label>
					<input type="text" id="city" {...register('city')} />
					<p className={styles.error}>{errors.city?.message}</p>
				</div>
				<div>
					<label htmlFor="region" className="required">Region</label>
					<input type="text" id="region" {...register('region')} />
					<p className={styles.error}>{errors.region?.message}</p>
				</div>
				<div className="grid grid-cols-2 gap-x-4">
					<div>
						<label htmlFor="zip" className="required">Zip Code</label>
						<input type="number" id="zip" {...register('zip')} min={0} />
						<p className={styles.error}>{errors.zip?.message}</p>
					</div>
					<div>
						<label htmlFor="brgy" className="required">Barangay</label>
						<input type="text" id="brgy" {...register('barangay')} />
						<p className={styles.error}>{errors.barangay?.message}</p>
					</div>
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
				{details.igLink && <p>Instagram: <span className="font-semibold">{details.igLink}</span></p>}
				<p>Contact Number: <span className="font-semibold">{details.contactNumber}</span></p>
				<p>Full Address: <span className="font-semibold">{details.address}</span></p>
			</div>
		)
	}

	return <></>
}