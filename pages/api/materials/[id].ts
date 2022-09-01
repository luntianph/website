import { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '@lib/db'
import Material, { materialSchema } from '@models/material'
import { getSession } from 'next-auth/react'
import Product from '@models/product'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const { method, body } = req
	const query = req.query as { id: string }

	const session = await getSession({ req })
	if (!session?.user) return res.status(403)

	try {
		switch (method) {
			case 'PUT': {
				const [data] = await Promise.all([
					materialSchema.validate(body, { strict: true }),
					dbConnect()
				])

				const [ids] = await Promise.all([
					Product.find({ material: query.id }, '_id').lean(), // find all products dependent on the material
					Material.updateOne({ id: query.id }, data)
				])

				// update all the product pages using the material
				await Promise.all(ids.map(item => res.revalidate(`/products/${item._id}`)))
				break
			}

			case 'DELETE': {
				const count = await Product.find({ materials: query.id }, '_id').countDocuments()

				if (count) {
					res.statusMessage = `${count} products still use this material.`
					throw Error(`${count} products still use this material.`)
				}

				await Material.deleteOne({ _id: query.id })
				break
			}

			default:
				res.setHeader('Allow', ['PUT', 'DELETE'])
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
