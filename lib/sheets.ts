import Product from '@models/product'
import { OrderBody } from '@pages/api/orders'
import { google } from 'googleapis'

const jwtClient = new google.auth.JWT(
	process.env.GSERVICE_EMAIL,
	undefined,
	process.env.GSERVICE_KEY.replace(/\\n/g, '\n'),
	['https://www.googleapis.com/auth/spreadsheets']
)

jwtClient.authorize((err) => {
	if (err) console.log(err)
})

const sheets = google.sheets('v4').spreadsheets.values

export async function addOrder(order: OrderBody) {
	const products = await Product.find({ _id: { $in: order.items.map(i => i.id) } }, 'column price').sort('column').lean()
	const quantities: (number | undefined)[] = []
	let curColIdx = 0, sum = 0

	for (let i = 0; i < products.length; i++) {
		for (; curColIdx < products[i].column; curColIdx++) {
			quantities.push(undefined)
		}

		const q = order.items.find(t => t.id == products[i]._id)?.quantity
		quantities.push(q)
		sum += products[i].price * (q ?? 0)
		curColIdx++
	}

	const values = [[
		new Date(),
		order.details.email,
		order.details.firstName,
		order.details.lastName,
		order.details.contactNumber,
		order.details.address,
		order.details.city,
		order.details.region,
		order.details.zip,
		order.details.barangay,
		order.details.igLink,
		order.delivery.method,
		...quantities,
		sum,
	]]

	await sheets.append({
		auth: jwtClient,
		spreadsheetId: process.env.GSHEET_ID,
		range: 'Orders',
		valueInputOption: 'RAW',
		includeValuesInResponse: false,
		requestBody: {
			values
		}
	})
}
