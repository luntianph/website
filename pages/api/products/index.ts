import { NextApiRequest, NextApiResponse } from 'next'
import Products, { productSchema } from '@models/product'
import dbConnect from '@lib/db'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const { method } = req

	try {
		switch (method) {
			case 'POST': {
				const [product] = await Promise.all([
					productSchema.validate(req.body),
					dbConnect()
				])

				await Products.create(product)
				await res.revalidate('/products')
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
