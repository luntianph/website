import { MESSENGER_URL } from '@lib/urls'
import { OrderBody } from '@pages/api/orders'
import OrderSummary from './order-summary'

const OrderConfirmationEmail = ({ items, sum }: OrderBody) => {
	return (
		<>
			<p>We have received your order. Please proceed with payment.</p>
			<OrderSummary items={items} sum={sum} />
			<p style={{ marginTop: 0 }}><em>*Shipping fee not included.</em></p>
			<div>
				<ul className="space-y-4">
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
					Send your order form and proof of payment on our Facebook Page: <a href={MESSENGER_URL}>{MESSENGER_URL}</a>
				</p>
			</div>
		</>
	)
}

export default OrderConfirmationEmail

