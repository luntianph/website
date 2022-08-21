import { OrderBody } from '@pages/api/orders'

const OrderSummary = ({ items, sum }: Pick<OrderBody, 'items' | 'sum'>) => {
	return (
		<div>
			<b>---Order Summary---</b>
			<table>
				<thead>
					<tr>
						<th>Product Name</th>
						<th>Quantity</th>
						<th>Unit Price</th>
						<th>Total</th>
					</tr>
				</thead>
				<tbody>
					{items.map(item => (
						<tr key={item.id.toString()}>
							<td>{item.name}</td>
							<td style={{ textAlign: 'center' }}>{item.quantity}</td>
							<td style={{ textAlign: 'right' }}>{item.price.toFixed(2)}</td>
							<td style={{ textAlign: 'right' }}>{(item.quantity * item.price).toFixed(2)}</td>
						</tr>
					))}
					<tr>
						<td colSpan={4} style={{ textAlign: 'right' }}><b>Total: </b>{sum.toFixed(2)}</td>
					</tr>
				</tbody>
			</table>
		</div>
	)
}

export default OrderSummary
