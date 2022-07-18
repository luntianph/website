import sendEmail from '@lib/mailer'
import { ContactSchema, contactSchema } from '@pages/contact-us'
import { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const { body, method } = req
	const data = body as ContactSchema

	try {
		switch (method) {
			case 'POST': {
				const result = await contactSchema.isValid(data)

				if (result) {
					await sendEmail(process.env.NEXT_PUBLIC_ADMIN_EMAIL, 'New Message', `
						<p><b>From:</b> ${data.name} (${data.email})</p>
						${data.phone && `<p><b>Contact Number:</b> ${data.phone}</p>`}
						<p>${data.body}</p>
					`)
				}

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
