import { yupResolver } from '@hookform/resolvers/yup'
import { deliveryMethodSchema, IDeliveryMethod } from '@models/order'
import styles from '@styles/Checkout.module.css'
import { useForm } from 'react-hook-form'

const DeliveryMethods = () => {
	const { register, handleSubmit, formState: { errors } } = useForm<IDeliveryMethod>({
		resolver: yupResolver(deliveryMethodSchema)
	})

	function onSubmit(data: IDeliveryMethod) {
		console.log(data);
	}

	return (
		<form className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
			<label className={styles['delivery-option']} htmlFor="same-day-delivery">
				<input type="radio" id="same-day-delivery" {...register('method')} value="Same-Day Delivery" />
				<div>
					<h5>Same-Day Delivery</h5>
					<p>Buyer will book and shoulder the delivery cost</p>
				</div>
			</label>
			<label className={styles['delivery-option']} htmlFor="gogo-express">
				<input type="radio" id="gogo-express" {...register('method')} value="GogoExpress" />
				<div>
					<h5>GogoExpress</h5>
					<p>Shipping fee will be paid after sending address confirmation</p>
					<p>Metro Manila (2-3 Days)</p>
					<p>Outside NCR (5-7 Days)</p>
				</div>
			</label>
			<p className={styles.error + ' !mt-0'}>{errors.method?.message}</p>
			<input type="submit" value="Continue" className={styles['submit-btn']} />
		</form>
	)
}

export default DeliveryMethods
