import Head from 'next/head'
import Image from 'next/future/image'
import { FC } from 'react'
import { TeamMember } from '@components/team-member'

const AboutUs: FC = () => {
	return (
		<div className="container mx-auto px-4">
			<Head>
				<title>Luntian | About Us</title>
			</Head>
			<section className="grid place-items-center">
				<Image src="/logo.png" alt="Luntian Logo" width={300} height={300} />
				<p className="max-w-prose text-justify mb-4">
					LUNTIAN is an acronym of a phrase “Lunas ang Tinig ng Animo” which translates to
					“change is what the spirit longs” in English. The phrase itself holds a deep ambition of
					creating a movement that favors us and the world. Luntian as a word itself also means green.
					Green is commonly associated with the colors of nature. This color symbolizes the type of
					change that the enterprise yearns to achieve, which is to introduce a new environmentally
					conscious path to the Filipinos.
				</p>

				<p className="max-w-prose text-justify">
					The team decided to name the brand as 1%. The mission of LUNTIAN centers around the idea of
					converting at least 1% of online sellers in the Philippines to consider sustainable packaging
					solutions in their operations. Deemed significantly tiny compared to the 99%, 1% is one-step
					forward to choosing the planet over profit rather than nothing or zero. This creates a small
					but sure movement towards change, which is what the spirit longs for.
				</p>
			</section>
			<section className="grid lg:grid-cols-2 gap-4 max-w-4xl mx-auto my-20 mb-20">
				<div className="grid justify-items-center items-start">
					<Image src="/store.png" width={150} height={150} alt="Store Front" />
					<h2 className="font-basteleur text-4xl text-center text-green-700 mb-2">Vision</h2>
					<p className="text-center">
						To introduce the Filipino business owners to a more environmentally responsible delivery
						habit by converting 1% of online sellers in the Philippines by mid 2023. This will be done
						by continuously partnering with online business owners and being a vehicle for the promotion
						of a lifelong positive change toward an eco-friendlier lifestyle one step at a time.”
					</p>
				</div>
				<div className="grid justify-items-center items-start h-min">
					<Image src="/plant.png" width={150} height={150} alt="Growing Plant" />
					<h2 className="font-basteleur text-4xl text-center text-green-700 mb-2">Mission</h2>
					<p className="text-center">
						To lead businesses to an environmentally-conscious path starting
						with their packaging materials without, ever, depending on harmful plastics
					</p>
				</div>
			</section>
			<div className="relative w-full max-w-4xl mx-auto aspect-[1225/473] my-16">
				<Image src="/images/about/cover.webp" alt="Picture of the team forming an L sign with the right hand." fill />
			</div>
			<section className="text-center pb-20">
				<h1 className="text-6xl text-green-500 font-bold">Our Team</h1>
				<hr className="w-8 h-1 bg-gray-800 mx-auto my-4" />
				<p className="text-center mb-6">The team behind LUNTIAN&apos;s success</p>
				<div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
					<TeamMember name="Lyanne Carmel L. Sy" position="Chief Executive Officer and Director of Integrated Marketing Communications" src="/images/about/lyanne.webp" />
					<TeamMember name="Andrea Nicole I. Bugarin" position="Corporate Secretary and Director of Sales and Research & Development" src="/images/about/andrea.webp" />
					<TeamMember name="Janna P. Pablo" position="Corporate Treasurer and Director of Finance and Operations" src="/images/about/janna.webp" />
					<TeamMember name="Timothy Jacob D. Oscaris" position="Director of Strategic Analysis and Human Resources" src="/images/about/timothy.webp" />
					<TeamMember name="Jericho Janseen N. Lo" position="Director of Production and Customer Services" src="/images/about/jericho.webp" />
				</div>
			</section>
		</div>
	)
}

export default AboutUs
