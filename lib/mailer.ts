import wrapInLayout from '@components/email/layout'
import nodemailer from 'nodemailer'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

/**
 * Utility function for sending emails
 * @param to - email receipient
 * @param subject - email subject line
 * @param content - string in markup syntax to create the email body
 * @returns a promise to the result of the email sending
 */
export default async function sendEmail(to: string, subject: string, content: string | React.ReactElement) {
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

	const html = typeof content == 'string' ? content : renderToStaticMarkup(content)
	return await transporter.sendMail({ from: process.env.NEXT_PUBLIC_ADMIN_EMAIL, to, subject, html: wrapInLayout(html) })
}
