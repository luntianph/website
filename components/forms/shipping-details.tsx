import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { IShippingDetails, shippingDetailsSchema } from '@models/order'
import styles from '@styles/Checkout.module.css'

export default function ShippingDetails() {
	const { register, handleSubmit, formState: { errors } } = useForm<IShippingDetails>({
		resolver: yupResolver(shippingDetailsSchema)
	})

	function onSubmit(data: IShippingDetails) {

	}

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
				<input type="number" id="contact" {...register('contactNumber')} className="appearance-none" placeholder="Ex: 09123456789" />
				<p className={styles.error}>{errors.contactNumber?.message}</p>
			</div>
			<div>
				<label htmlFor="last-name" className="required">Address</label>
				<input type="text" id="last-name" {...register('address')} />
				<p className={styles.error}>{errors.address?.message}</p>
			</div>
			<input className={styles['submit-btn']} type="submit" value="Continue" />
		</form>
	)
}