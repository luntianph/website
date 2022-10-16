import { NextPage } from 'next'
import Head from 'next/head'
import styles from '@styles/FAQ.module.css'
import { CONTACT_NUMBER, FACEBOOK_URL } from '@lib/urls'
import { StarIcon } from '@heroicons/react/24/outline'
import Image from 'next/future/image'

const FAQs: NextPage = () => {
	return (
		<div className={styles.faq}>
			<Head>
				<title>Luntian | FAQs</title>
			</Head>

			<section>
				<h1 className="font-basteleur text-gray-600 text-6xl text-center">?</h1>
				<h1 className="font-basteleur text-green-700 text-4xl text-center">Frequently Asked Questions</h1>
			</section>

			<section>
				<div className={styles.header}>
					<Image src="/mailer-icon.png" alt="Mailer Icon" width={48} height={53} />
					<h2>PRODUCT</h2>
				</div>
				<div>
					<p className={styles.question}>How many days do your compostable products compost?</p>
					<p>When placed in a <strong>compost container/bin</strong>, the bubble wrap
						can be decomposed in as little as <strong>3 to 6 months</strong>.
					</p>
				</div>
				<div>
					<p className={styles.question}>What are the 1% Compostable Kraft Bubble Mailers made of?</p>
					<p>The covering of our mailer is just <strong>kraft paper</strong> while the bubble wrap is made of
						<strong> Polybutylene Adipate Terephthalate (PBAT), Polylactic Acid (PLA), and Cornstarch</strong>.
						Our materials and the production of the mailer are internationally sourced. We make sure that our
						products are purely compostable by relying on producers that have their products tested by the
						certified authorities that ensures the compostability and quality of our products!
					</p>
				</div>
				<div>
					<p className={styles.question}>Are the 1% Compostable Kraft Bubble Mailers waterproof?</p>
					<p>Our mailers are not just eco-friendly, our high-quality packaging is stronger than it looks 💚.
						The Kraft Paper of the mailer basically gets wet and absorbs liquid, but the bubble layer prevents
						water and moisture from leaking towards the packaged items. It can practicaly protect your
						stuff from a good amount of water as well. However, do keep in mind as the {' '}
						<strong>mailers are not entirely waterproof</strong>. So we recommend using them as an internal
						packaging and use them at your own risk and convenience 🌿
					</p>
				</div>
			</section>

			<section>
				<div className={styles.header}>
					<StarIcon className="w-8" />
					<h2>DELIVERY</h2>
				</div>
				<div>
					<p className={styles.question}>Do you offer same-day deliveries?</p>
					<p>Yes we do! You can inquire on our <a href={FACEBOOK_URL}>Facebook page</a> or contact us at {CONTACT_NUMBER + ' '}
						for more details! If you wish to order right away, please input the following information:</p>
					<ul className={styles['delivery-list']}>
						<li>Name</li>
						<li>Contact</li>
						<li>Mode of Payment (GCash, BDO, Robinsons Bank)</li>
						<li>List of Orders</li>
						<li>Preferred Delivery Method* (Please refer to how our delivery process works)</li>
						<li>Preferred Pickup Time (if applicable)</li>
					</ul>
					<p className="italic">*Customers will shoulder the delivery and its fees unless ongoing promo/s apply.</p>
				</div>
				<div>
					<p className={styles.question}>What is your delivery process?</p>
					<p>All shipping costs will be shouldered by the buyer unless ongoing promo applies.</p>
					<ul className="my-4 grid gap-y-1">
						<li className="before:content-['🛵_']">
							<strong>Same-day delivery</strong> through Grab, Lalamove, or MrSpeedy (arranged by buyer to ensure correct details)
						</li>
						<li className="before:content-['🚚_']">
							<strong>Nationwide delivery via J&amp;T</strong> <a href="https://www.jtexpress.ph/index/query/query.html">here</a>
							{' '}or Gogo Express (please see attached photo for delivery rates)
						</li>
						<li className="before:content-['🤝🏼_']">
							You may also opt to <strong>pick up your orders</strong> from our pick-up points if you prefer.
							No additional charges shall be applied.
						</li>
					</ul>
				</div>
			</section>
			<section>
				<div className={styles.header}>
					<Image src="/mailer-icon.png" alt="Mailer Icon" width={48} height={53} />
					<h2>MATERIAL</h2>
				</div>
				<div>
					<p className={styles.question}>What are your compost certifications?</p>
					<div className={styles.certifications}>
						<Image src="/tuv-austria.png" alt="TUV Austria Logo" width={128} height={64} />
						<div>
							<h3>TUV Austria</h3>
							<p>
								In a TUV Austria certification, the majority of the tests for home compostability are based on an Australian
								standard called AS 5810, which is titled Biodegradable plastics suitable for home composting. This grade demands 6 months
								for disintegration and a year for biodegradation and compost production in a home compost environment. Meaning to say, it has
								ambient temperatures, done in a natural microbial community and mixed with other home compostable ingredients such as banana peels,
								eggshells and the like (UrthPact, 2020). If the mentioned prerequisites are met in the materials, then this marking will be
								issued to inform the public of its properties.
							</p>
						</div>
						<Image src="/bpi.jpg" alt="BPI Logo" width={128} height={169} />
						<div>
							<h3>BPI</h3>
							<p>
								BPI is a pioneer in offering biodegradable product and packaging certifications in North America. Their comprehensive
								certification procedure has been trusted to certify the compostability of hundreds of various goods and packages, providing
								businesses with the assurance they need to launch more sustainable products. When packaging is BPI Certified, consumers
								and industrial composters may rest certain that it has been thoroughly tested for compostability and can be disposed of
								in a compost bin. This is because the ASTM D6868 testing method was used, a method designed by a reputable international
								organization that conducts research for the formulation of standard in materials. According to Nature Fresh Farms, the
								following are the criteria of their testing:
							</p>
							<ul>
								<li>It was tested for the presence of any harmful compounds, such as asphalt, heavy metals, or fluorinated chemicals.</li>
								<li>
									The disintegration of the tray was tested to ensure it would break down in an industrial compost setting with optimal
									compost conditions. It took approximately 3 months for the tray to break down to 100% disintegration.
								</li>
								<li>
									Some companies also add strong bonding agents to their paper materials which can affect their compostability.
									This testing checks for any of these bonding agents to ensure compostability is not compromised.
								</li>
							</ul>
						</div>
						<Image src="/din.png" alt="DIN Logo" width={128} height={158} />
						<div>
							<h3>DIN Tested</h3>
							<p>
								The DIN marking means that it has been tested and reviewed by the organization of DIN CERTCO and is an authentic
								proof that the product is safe for home or garden composting. The basis of the tests that were made was frameworked
								from the NF T51-800 standard. Specifically, some of the research conducted involved:
							</p>
							<ul>
								<li>Chemical characterization</li>
								<li>Complete biodegradability</li>
								<li>Disintegration</li>
								<li>Plant compatibility (ecotoxicity test)</li>
								<li>Earthworm toxicity test (for AS 5810)</li>
							</ul>
						</div>
					</div>
				</div>
			</section>

			<section className={styles.citations}>
				<cite>
					<a href="https://www.naturefresh.ca/bpi-certification-why-it-matters/">
						What is a BPI Certification &amp; Why does it matter? Nature Fresh Farms. (2021, April 23). Retrieved July 19, 2022.
					</a>
				</cite>
				<cite>
					<a href="https://www.urthpact.com/certified-compostable-products-what-to-look-for-and-what-it-means/ ">
						Plainvanilla. (2021, February 22). Certified compostable products: What to look for and what it means. UrthPact.
						Retrieved February 27, 2022.</a>
				</cite>
				<cite>
					<a href="https://www.dincertco.de/din-certco/en/main-navigation/products-and-services/certification-of-products/environmental-field/products-made-of-compostable-materials-for-home-and-garden-composting/">
						Rheinland, T. Ü. V. (n.d.). Products from biodegradable materials for home and Garden Co. Products from Biodegradable Materials
						for Home and Garden Co | TÜV Rheinland. Retrieved February 27, 2022.
					</a>
				</cite>
			</section>
		</div>
	)
}

export default FAQs
