import { MESSENGER_URL } from '@lib/urls'
import { OrderBody } from '@pages/api/orders'
import OrderSummary from './order-summary'

const OrderConfirmationEmail = ({ items, sum, details }: OrderBody) => {
	return (
		<>
			<p>We have received your order. Kindly reply to this email to confirm the details below and proceed with payment.</p>
			<p>
				<b>---Personal Information---</b><br />
				<span>Name: {details.firstName} {details.lastName}</span><br />
				<span>Email: {details.email}</span><br />
				<span>Contact Number: {details.contactNumber}</span><br />
				<span>Instagram: {details.igLink}</span><br />
			</p>
			<p>
				<b>---Address Details---</b><br />
				<span>Full Address: {details.address}</span><br />
				<span>City: {details.city}</span><br />
				<span>Region: {details.region}</span><br />
				<span>Zip: {details.zip}</span><br />
				<span>Barangay: {details.barangay}</span>
			</p>
			<OrderSummary items={items} sum={sum} />
			<p style={{ marginTop: 0 }}><em>*Shipping fee not included.</em></p>
			<div>
				<p>📌 Reminders:</p>
				<p style={{ maxWidth: '65ch' }}>
					<b>MAKE READING A HABIT 🥰.</b> Kindly read everything in the terms and conditions before proceeding with your order. The accomplishment of the form serves as a confirmation that you are ordering and paying for the products that you have ordered.
				</p>
				<p style={{ maxWidth: '65ch' }}>
					<b>PRIVATE MESSAGES ARE ALWAYS OPEN.</b> Feel free to message us in our social media platform if you have inquiries about our company, product, and your order. We will try to reply as fast as possible!
				</p>
				<p style={{ maxWidth: '65ch' }}>
					<b>WE ARE NOT LIABLE FOR DAMAGES OR DENTS CAUSED BY THE COURIER.</b> We will be thoroughly checking the products for any tears and dents and will be photographing the products before the ship-out. Thus, any damages/dents occurred due to shipping.
				</p>
				<p style={{ maxWidth: '65ch' }}>
					<b>NO VIDEO UNBOXING = NO REFUND.</b> We highly recommend you to film your unboxing as we will strictly not fo refunds/returns/exchange unless show proof of video from the start of unboxing of the video in the event that there is negligence on LUNTIAN&apos;s part.
				</p>
			</div>
			<div>
				<b>---Payment Options---</b>
				<ul>
					<li>
						<p>Banco de Oro</p>
						<p>Account Name: Lyanne Carmel L. Sy</p>
						<p>Account #: 000570198186</p>
					</li>
					<li>
						<p>Robinson&apos;s Bank</p>
						<p>Account Name: Lyanne Carmel Lim Sy</p>
						<p>Account #: 103530100002780</p>
					</li>
					<li>
						<p>GCash</p>
						<p>Name: Andrea Nicole B.</p>
						<p>Contact#: 0945 726 0108</p>
					</li>
				</ul>
				<p style={{ marginTop: '1em' }}>
					<b><u>Send your order form and proof of payment on our Facebook Page: <a href={MESSENGER_URL}>{MESSENGER_URL}</a></u></b>
				</p>
			</div>
			<p>Thank you for being part the 1% and stay safe!</p>
		</>
	)
}

export default OrderConfirmationEmail

