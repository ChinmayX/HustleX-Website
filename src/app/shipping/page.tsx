"use client";

import { Back } from "../../components/back";
import { Footer } from "../../components/footer";

const Shipping = () => (
	<div className="flex flex-col items-center w-full bg-white text-justify">
		<Back />
		<div className="px-10 pb-20 w-full xl:w-5xl text-black">
			<h1 className="text-4xl font-bold mt-10 mb-2">Shipping Policy</h1>
			<p className="mb-2">
				HustleX only takes orders within India. Any order from other nations will not be
				fulfilled, and the debited money and Hustle Coins will be refunded to the user.
			</p>
			<p className="mb-2">
				For domestic buyers, orders are shipped through registered domestic courier
				companies and/or speed post only. The majority of orders will be routed through
				Amazon.
			</p>
			<p className="mb-2">
				HustleX is not liable for any delay in delivery by the courier company or postal
				authorities and only guarantees to hand over the consignment to the courier company
				or postal authorities within 8+ days from the date of the order and payment, or as
				per the delivery date agreed upon at the time of order confirmation, subject to
				courier company/post office norms.
			</p>
			<p className="mb-2">
				Delivery of all orders will be to the address provided by the buyer. HustleX will
				not be liable for any incorrect or incomplete address provided by the buyer.
			</p>
			<p className="mb-2">
				Delivery of our services will be confirmed via your email ID as specified during
				account creation. For any issues in utilizing our services, you may contact us at
				social.hustlex@gmail.com.
			</p>
		</div>
		<Footer />
	</div>
);

export default Shipping;
