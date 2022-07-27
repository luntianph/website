import { NextApiRequest, NextApiResponse } from 'next'
import Products from '@models/product'
import dbConnect from '@lib/db'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const { query, method } = req

	try {
		switch (method) {
			case 'GET': {
				await dbConnect()
				const product = await Products.findById(query.id).lean()				
				res.json(product)
				break
			}

			default:
				res.setHeader('Allow', ['GET'])
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
