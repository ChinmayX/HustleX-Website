"use client";

import { Back } from "../../components/back";
import { Footer } from "../../components/footer";

import { playfairDisplay } from "../../ui/ui";

const Refund = () => (
	<div className="flex flex-col items-center w-full bg-white text-justify">
		<Back />
		<div className="px-10 pb-20 w-full xl:w-5xl text-black">
			<h1 className="text-4xl font-bold mt-10 mb-2 text-left xl:text-justify">
				<span className={`${playfairDisplay.className} italic text-blue-600`}>
					Cancellation
				</span>
				,{" "}
				<span className={`${playfairDisplay.className} italic text-blue-600`}>Return</span>,
				and{" "}
				<span className={`${playfairDisplay.className} italic text-blue-600`}>Refund</span>{" "}
				Policy
			</h1>
			<p className="mb-4 font-semibold">Effective Date: 28-06-2024</p>
			<p className="mb-6">
				Welcome to HustleX! We aim to ensure a smooth and satisfying experience for all our
				customers. Please read our Cancellation and Refund Policy carefully to understand
				your rights and responsibilities.
			</p>
			<h2 className="text-2xl font-semibold mb-2">Order Cancellations</h2>
			<p className="mb-6">
				Orders placed on the Hustle Store can be canceled only if the order has not been
				dispatched. To request a cancellation, please contact us at the details provided
				below.
			</p>
			<h3 className="text-lg font-semibold mb-2">Order Fulfillment</h3>
			<p className="mb-6">
				Orders are fulfilled by different commerce providers in partnership with HustleX.
				Specific terms may apply depending on the provider. Please refer to the respective
				provider's terms and conditions for more details.
			</p>
			<h3 className="text-lg font-semibold mb-2">Product Returns</h3>
			<p className="mb-6">
				Products can be returned within 7 days after delivery. To initiate a return, please
				contact us at the details provided below.
			</p>
			<h2 className="text-2xl font-semibold mb-2">Return Conditions</h2>
			<ul className="mb-4 list-disc list-inside">
				<li>The product must be its original packaging.</li>
				<li>
					The product must be unused and undamaged, in the same condition as received.
				</li>
				<li>
					Customers are responsible for ensuring the product is returned in a resalable
					condition.
				</li>
			</ul>
			<h2 className="text-2xl font-semibold mb-2">Refund Policy</h2>
			<ul className="mb-4 list-disc list-inside">
				<li>
					<strong>Refunds for Returned Products:</strong>
					<ul className="ml-4 list-disc list-inside">
						<li>
							Eligible returns will be refunded once the product is inspected and
							approved.
						</li>
						<li>
							Refunds will be processed to the original payment method within 7-10
							business days after approval.
						</li>
					</ul>
				</li>
				<li>
					<strong>Refunds for Sale Items:</strong> Items purchased on sale are eligible
					for refunds, but must meet the return conditions.
				</li>
				<li>
					<strong>Non-Exchangeable Policy:</strong> HustleX does not offer product
					exchanges at this time.
				</li>
			</ul>
			<h2 className="text-2xl font-semibold mb-2">Contact Us</h2>
			<ul className="mb-6 list-disc list-inside">
				<li>
					<strong>Email:</strong> social.hustlex@gmail.com
				</li>
				<li>
					<strong>Phone:</strong> +91 91411 96450
				</li>
			</ul>
		</div>
		<Footer />
	</div>
);

export default Refund;
