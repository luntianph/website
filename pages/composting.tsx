import { NextPage } from 'next'
import Image from 'next/future/image'
import styles from '@styles/Composting.module.css'
import Head from 'next/head'

const Care: NextPage = () => {
	return (
		<div className="grid h-min mt-10 mb-20 gap-y-8">
			<Head>
				<title>Luntian | Composting</title>
			</Head>
			<div className={styles.header}>
				<Image className="-rotate-12" src="/small-mailer.png" alt="Small Mailer" width={100} height={100} />
				<div>
					<h1>How to Compost</h1>
					<h2>Here&apos;s how you can compost LUNTIAN&apos;s compostable products</h2>
				</div>
			</div>
			<div className={styles.composting}>
				<div>
					<Image src="/compost/1.png" alt="Empty pot" fill />
				</div>
				<h3>Step 1: Prepare a big container or bin that you can use for your compost</h3>
				<div>
					<Image src="/compost/2.png" alt="Biodegradeable materials" fill />
				</div>
				<div className="relative">
					<h3>Step 2: Compile the compost materials that you will need.
						These are biodegradable that can be found in your own household
					</h3>
					<p className="my-4 sm:w-3/4">Common things you may use are paper, twigs, dead leaves, paper, egg shells, fruit peels, unused vegetable parts and the like.</p>
					<p className="sm:w-3/4">
						Don&apos;t forget to add the used 1% Compostable Mailer and it is preferably more effective when
						the materials stated are cut or shredded into smaller pieces and the adhesive area is removed.
					</p>
					<div className="absolute -right-4 top-[45%] hidden sm:block sm:right-0 md:right-8 -bottom-14">
						<Image src="/compost/3.png" alt="Luntian Mailer" width={111} height={145} />
					</div>
				</div>
				<div>
					<Image src="/compost/4.png" alt="Filled pot" fill />
				</div>
				<h3>
					Step 3: Cover the opening of the container or bin with a used plastic to trap the heat and
					contain the good bacteria that will help in the composting process
				</h3>
				<div className='flex items-center'>
					<Image src="/compost/5.png" alt="Plant with meter bar" width={409} height={254} />
				</div>
				<h3>Step 4: Check its progress every week and let nature do its thing </h3>
				<div>
					<Image src="/compost/6.png" alt="Fertilizer" fill />
				</div>
				<h3>Step 5: Once it has fully degraded, you may now use it for fertilizer for your plants</h3>
				<div className="col-span-full max-w-md justify-self-center">
					<div className="rounded-lg bg-green-200 grid place-items-center py-8 w-full">
						<Image src="/compost/well-done.png" alt="well done!" width={180} height={180} />
						<p className="text-yellow-800 font-bold text-center text-xl mt-4">
							1% challenge achieved! Show us your home composting journey by mentioning @luntianofficialph in FB/IG
						</p>
					</div>
					<div className="flex mt-8 md:w-96 mx-auto items-center justify-center">
						<div className="-rotate-12">
							<Image src="/compost/instructions.png" alt="instructions" width={90} height={144} />
						</div>
						<p className="text-[#61966A] text-xl font-bold ml-8 md:w-56">Get your free printable instruction card {' '}
							<a target="blank" href="https://drive.google.com/uc?export=download&amp;id=1iNnKHSgXUcsdV2Uxp_RM0oxuHjCyIMul" rel="noreferrer">
								here!</a>
						</p>
					</div>
				</div>
			</div>
			<div className={styles.header}>
				<Image className="-rotate-12" src="/small-mailer.png" alt="Small Mailer" width={100} height={100} />
				<div>
					<h1>Care Instructions</h1>
					<h2>How to take care and preserve the condition of 1% mailers</h2>
				</div>
			</div>
			<div className="max-w-4xl bg-green-50 rounded-md mx-auto w-full py-8 px-4 flex justify-center">
				<ol className="list-decimal text-lg ml-4 font-semibold text-[#64802C]">
					<li>Avoid long exposure of the mailers from sunlight or extreme heat</li>
					<li>Be careful not to submerge or soak your mailers in water as it will damage its integrity</li>
					<li>Organize your mailers in a way that it does not get crumpled or squished to retain its shape</li>
				</ol>
			</div>
		</div>
	)
}

export default Care
