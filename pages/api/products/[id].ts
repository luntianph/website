import { NextApiRequest, NextApiResponse } from 'next'
import Products, { IProduct } from '@models/product'
import dbConnect from '@lib/db'
import { IMaterial } from '@models/material'

export type APIProduct = Omit<IProduct, 'materials'> & {
	materials: Pick<IMaterial, 'items'>
}

export type LeanAPIProduct = Pick<IProduct, 'name' | 'price' | 'color'> & {
	image: string
}

const handler = async (req: NextApiRequest, res: NextApiResponse<APIProduct | LeanAPIProduct>) => {
	const { query, method } = req

	try {
		switch (method) {
			case 'GET': {
				await dbConnect()

				if (req.query.mode == 'lean') {
					const product = await Products
						.findById(query.id, 'name price color')
						.select({ image: { $first: '$images' } })
						.select('-images')
						.lean()

					return res.json(product as unknown as LeanAPIProduct)
				}

				const product = await Products
					.findById(query.id, '-_id -__v')
					.populate({
						path: 'materials',
						select: '-_id items'
					}).lean()

				res.json(product as APIProduct)
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
