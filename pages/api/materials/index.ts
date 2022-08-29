import { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '@lib/db'
import Material, { IMaterial } from '@models/material'

export type MaterialGetAPI = IMaterial[]

const handler = async (req: NextApiRequest, res: NextApiResponse<MaterialGetAPI>) => {
	const { method } = req

	try {
		switch (method) {
			case 'GET': {
				await dbConnect()
				res.json(await Material.find({}).lean())
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
