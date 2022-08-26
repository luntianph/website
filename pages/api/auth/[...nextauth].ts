import NextAuth from 'next-auth'
import GoogleProvider from "next-auth/providers/google"

export default NextAuth({
	providers: [
		GoogleProvider({
			clientId: process.env.GAUTH_CLIENT_ID,
			clientSecret: process.env.GAUTH_CLIENT_SECRET,
		})
	],
	session: {
		strategy: "jwt"
	},
	callbacks: {
		async signIn({ account, profile }) {
			if (account.provider === 'google' && profile.email == process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
				return true
			}

			throw new Error('Unauthorized user.')
		},
	},
	pages: {
		error: '/'
	},
})
