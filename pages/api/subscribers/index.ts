import sendEmail from '@lib/mailer'
import Subscriber from '@models/subscriber'
import { NextApiRequest, NextApiResponse } from 'next'
import { MongoError } from 'mongodb'
import dbConnect from '@lib/db'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const { body, method } = req

	try {
		switch (method) {
			case 'POST': {
				if (!body.email) {
					throw Error('Invalid email!')
				}

				await dbConnect()
				await Subscriber.create({ _id: body.email })
				await sendEmail(body.email, 'Luntian PH Newlettter Subscription', `<p>Thank you for subscribing to our newsletter!</p>`)

				break
			}

			default:
				res.setHeader('Allow', ['POST'])
				res.status(405).end(`Method ${method} Not Allowed`)
		}
	} catch (err) {
		if ((err as MongoError).code == 11000) {
			return res.status(403).send('You are already subscribed to our newsletter!')
		}
		console.log(err)
		res.status(500).send('A server-side error has occured. Please try again later.')
	} finally {
		res.end()
	}
}

export default handler
