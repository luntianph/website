import { FACEBOOK_URL, IG_URL, SHOPEE_URL, TIKTOK_URL } from '@lib/urls'

const wrapInLayout = (body: string) => `
<!DOCTYPE html>
<html lang="en">

<head>
	<!--[if !mso]><!-- -->
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<!--<![endif]-->
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta name="viewport" content="width=device-width; initial-scale=1.0;">
	<title>New Request</title>
	<style>
		table,th,td{border: 1px solid black;border-collapse:collapse}
		th,td{padding:0.25rem 0.5rem}
		img{width:100%;max-width:800px}
		li p{margin:0}
		p img{width:auto}
	</style>
</head>

<body>
	<header>
		<img alt="header image" src="https://imgur.com/GjuOODU.png">
	</header>
	<main>
		<p>Good day!</p>
		${body}
		<p>
			Regards,<br>
			<strong>LUNTIAN Philippines</strong>
		</p>
		<div style="font-size:.9em">
			<span>Facebook: <a href="${FACEBOOK_URL}">${FACEBOOK_URL}</a></span><br>
			<span>Shopee: <a href="${SHOPEE_URL}">${SHOPEE_URL}</a></span><br>
			<span>Instagram: <a href="${IG_URL}">${IG_URL}</a></span><br>
			<span>Tiktok: <a href="${TIKTOK_URL}">${TIKTOK_URL}</a></span><br>
		</div>
	</main>
	<footer>
		<img alt="footer image" src="https://imgur.com/qVPAK8u.png">
	</footer>
</body>

</html>
`

export default wrapInLayout
