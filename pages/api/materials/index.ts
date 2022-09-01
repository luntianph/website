import { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '@lib/db'
import Material, { IMaterial, materialSchema } from '@models/material'
import { getSession } from 'next-auth/react'

export type MaterialGetAPI = IMaterial[]

const handler = async (req: NextApiRequest, res: NextApiResponse<MaterialGetAPI>) => {
	const { method, body } = req

	try {
		switch (method) {
			case 'GET': {
				await dbConnect()
				res.json(await Material.find({}).lean())
				break
			}

			case 'POST': {
				const session = await getSession({ req })
				if (!session?.user) return res.status(403)

				const [data] = await Promise.all([
					materialSchema.validate(body),
					dbConnect()
				])

				await Material.create(data)
				break
			}

			default:
				res.setHeader('Allow', ['GET', 'POST'])
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
