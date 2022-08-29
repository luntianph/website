import Product from '@models/product'
import dbConnect from './db'

export async function getProductIds() {
	await dbConnect()
	return (await Product.find({}, '_id').lean())
		.map(item => ({
			params: {
				id: item._id.toString(),
				locale: 'en'
			}
		}))
}
