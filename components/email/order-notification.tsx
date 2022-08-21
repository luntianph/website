import { OrderBody } from '@pages/api/orders'
import OrderSummary from './order-summary'

const OrderNotificationEmail = ({ details, items, sum }: OrderBody) => {
	return (
		<>
			<p>You have a new order from {details.firstName} {details.lastName}.</p>
			<OrderSummary items={items} sum={sum} />
			<p>Check it out <a href={`https://docs.google.com/spreadsheets/d/${process.env.GSHEET_ID}/edit`}>here</a>!</p>
		</>
	)
}

export default OrderNotificationEmail
