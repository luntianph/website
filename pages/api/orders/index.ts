import OrderConfirmationEmail from '@components/email/order-confirmation'
import OrderNotificationEmail from '@components/email/order-notification'
import { CartItem } from '@lib/dexie'
import sendEmail from '@lib/mailer'
import { addOrder } from '@lib/sheets'
import { Order } from '@models/order'
import { NextApiRequest, NextApiResponse } from 'next'
import Product, { IProduct } from '@models/product'

type ItemBody = CartItem & Pick<IProduct, 'name' | 'column' | 'price'>

export type OrderBody = Order & {
	items: ItemBody[]
	sum: number
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const { method } = req
	const body = req.body as OrderBody

	try {
		switch (method) {
			case 'POST': {
				const products = await Product.find({ _id: { $in: body.items.map(i => i.id) } }, 'name column price').sort('column').lean()
				const sortedItems: ItemBody[] = []
				body.sum = 0

				for (let i = 0; i < products.length; i++) {
					const temp = {
						...body.items.splice(body.items.findIndex(item => item.id == products[i].id), 1)[0],
						price: products[i].price,
						name: products[i].name,
						column: products[i].column,
					}
					sortedItems.push(temp)
					body.sum += temp.price * temp.quantity
				}
				body.items = sortedItems

				addOrder(body)
				await Promise.all([
					sendEmail(body.details.email, '[LUNTIAN] Order Confirmation', OrderConfirmationEmail(body)),
					sendEmail(process.env.NEXT_PUBLIC_ADMIN_EMAIL, 'New Order', OrderNotificationEmail(body))
				])
				break
			}

			default:
				res.setHeader('Allow', ['POST'])
				res.status(405).end(`Method ${method} Not Allowed`)
		}
	} catch (err) {
		console.error(err)
		res.status(500)
	} finally {
		res.end()
	}
}

export default handler
