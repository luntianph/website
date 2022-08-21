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
	const quantities: (number | undefined)[] = []
	let curColIdx = 0, sum = 0

	order.items.forEach(item => {
		for (; curColIdx < item.column; curColIdx++) {
			quantities.push(undefined)
		}
		quantities.push(item.quantity)
		sum += item.price * item.quantity
		curColIdx++
	})

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
