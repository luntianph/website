import { NextApiRequest, NextApiResponse } from 'next'
import Products, { IProduct, productSchema } from '@models/product'
import dbConnect from '@lib/db'
import { IMaterial } from '@models/material'
import { ObjectId } from 'mongoose'

export type APIProduct = Omit<IProduct, 'materials'> & {
	materials: Pick<IMaterial, 'items'>
}

export type LeanAPIProduct = Pick<IProduct, 'name' | 'price' | 'color'> & {
	image: string
}

export async function getProduct(id: ObjectId | string) {
	await dbConnect()

	const product = await Products
		.findById(id, '-_id -__v')
		.populate({
			path: 'materials',
			select: '-_id items'
		}).lean()

	return product as APIProduct
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

				res.json(await getProduct(query.id as string))
				break
			}

			case 'PUT': {
				await dbConnect()
				const data = await productSchema.validate(req.body)
				await Products.updateOne({ _id: query.id }, data)
				Promise.all([
					res.revalidate(`/products`),
					res.revalidate(`/products/${query.id}`),
					res.revalidate(`/products/${query.id}/edit`)
				])
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
