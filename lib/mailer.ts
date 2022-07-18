import nodemailer from 'nodemailer'

/**
 * Utility function for sending emails
 * @param to - email receipient
 * @param subject - email subject line
 * @param html - string in markup syntax to create the email body
 * @returns a promise to the result of the email sending
 */
export default async function sendEmail(to: string, subject: string, html: string) {
	const transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: process.env.NEXT_PUBLIC_ADMIN_EMAIL,
			pass: process.env.MAIL_PASS,
		},
		tls: {
			rejectUnauthorized: false
		}
	})

	return await transporter.sendMail({ from: process.env.NEXT_PUBLIC_ADMIN_EMAIL, to, subject, html })
}
