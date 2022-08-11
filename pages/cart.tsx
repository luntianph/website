import { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'

const Cart: NextPage = () => {
	return (
		<>
			<div className="w-full h-[20vh] absolute bg-[url('/bg-photo.jpg')] bg-no-repeat bg-cover bg-[#BBB880] bg-blend-multiply opacity-75" />
			<div className="container mx-auto px-4 sm:px-0 mt-[calc(20vh+32px)] mb-24 relative z-10">
				<Head>
					<title>Luntian | Cart</title>
				</Head>


				<div className="grid md:grid-cols-[3fr_2fr] max-w-4xl mx-auto gap-x-4">
					<div>
						<h3 className="font-medium text-3xl">My Cart</h3>
						<hr />
						<div className="flex p-2">
							<Image src="/logo.png" alt="shop item" width={100} height={100} />
							<div className="grid grid-cols-2 flex-1">
								<div>
									<p className="font-bold">Daily Tote</p>
									<p className="font-semibold text-gray-500">₱850.00</p>
									<p className="font-semibold text-gray-500">Color: Kraft</p>
								</div>
								<div className="flex flex-col items-end">
									<input type="number" className="text-center w-24 appearance-none" defaultValue={0} />
									<p className="font-bold text-right">₱1700.00</p>
								</div>
							</div>
						</div>
					</div>
					<div className="flex flex-col items-end">
						<h3 className="text-3xl font-medium mb-2">Total:</h3>
						<h3 className="text-4xl mb-1.5">₱1700.00</h3>
						<button className="btn green px-4">Checkout</button>
					</div>
				</div>
			</div >
		</>
	)
}

export default Cart
