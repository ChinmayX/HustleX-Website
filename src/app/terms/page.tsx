"use client";

import { Back } from "../../components/back";
import { Footer } from "../../components/footer";

const Terms = () => (
	<div className="flex flex-col items-center w-full bg-white text-justify">
		<Back />
		<div className="px-10 pb-20 w-full xl:w-5xl text-black">
			<h1 className="text-4xl font-bold mt-10 mb-2">Terms and Conditions</h1>
			<p className="mb-4 font-semibold">Effective Date: 28-06-2024</p>
			<p className="mb-6">
				Welcome to HustleX! By using our app and services, you agree to comply with these
				Terms and Conditions. Please read them carefully.
			</p>
			<h2 className="text-2xl font-semibold mb-2">Account Creation</h2>
			<ul className="mb-4 list-disc list-inside">
				<li>
					To access certain features, users must create an account by providing accurate
					and up-to-date information.
				</li>
				<li>
					You are responsible for maintaining the confidentiality of your account
					credentials.
				</li>
				<li>
					HustleX is not responsible for unauthorized account access due to your failure
					to secure your login details.
				</li>
			</ul>
			<h3 className="text-lg font-semibold mb-2">In-App Purchases and Subscriptions</h3>
			<ul className="mb-4 list-disc list-inside">
				<li>
					HustleX offers in-app purchases, including curated goods (products/items) and
					subscription plans.
				</li>
				<li>Most of the app is free to use, but premium features may require payment.</li>
				<li>
					Payments are processed securely through trusted platforms, including Apple
					In-App Purchase, Google Play Billing, RevenueCat, and Cashfree Payments.
				</li>
				<li>
					Subscription plans automatically renew unless canceled before the renewal date.
				</li>
			</ul>
			<h3 className="text-lg font-semibold mb-2">Rewards and Promotions</h3>
			<ul className="mb-4 list-disc list-inside">
				<li>HustleX may offer promotions, contests, and other reward-based activities.</li>
				<li>
					HustleX does not permit any user to purchase any coins using real-world money to
					enter the reward promotions.
				</li>
				<li>
					Participation is voluntary and subject to specific rules provided for each
					activity.
				</li>
				<li>
					Users can participate in any reward promotion only by using the coins awarded to
					them by HustleX.
				</li>
				<li>
					HustleX reserves the right to modify, suspend, or cancel promotions at its
					discretion.
				</li>
			</ul>
			<h2 className="text-2xl font-semibold mb-2">Feedback and Suggestions</h2>
			<p className="mb-6">
				By submitting feedback, store wishlists or suggestions, you grant HustleX the right
				to use, implement, and modify them without compensation or credit.
			</p>
			<h2 className="text-2xl font-semibold mb-2">Intellectual Property</h2>
			<p className="mb-2">
				All content, features, and trademarks associated with HustleX are the exclusive
				property of HustleX. You may not copy, modify, distribute, or use any of our
				intellectual property without prior written permission. HustleX reserves the right
				to take legal action against any unauthorized use of its intellectual property.
			</p>
			<h2 className="text-2xl font-semibold mb-2">User Responsibilities</h2>
			<p className="mb-6">
				Users must not misuse the app, engage in fraudulent activities, or violate
				applicable laws. Any inappropriate or harmful behavior may result in account
				suspension or termination.
			</p>
			<h2 className="text-2xl font-semibold mb-2">Third-Party Services</h2>
			<p className="mb-2">
				HustleX integrates third-party services such as payment processors and analytics
				tools. These services have their own terms and conditions, and you agree to comply
				with them when using our app and services.
			</p>
			<h2 className="text-2xl font-semibold mb-2">Limitation of Liability</h2>
			<p className="mb-6">
				HustleX is provided "as is," and we do not guarantee uninterrupted or error-free
				use. We are not liable for any direct, indirect, incidental, or consequential
				damages arising from the use or inability to use our app or services.
			</p>
			<h2 className="text-2xl font-semibold mb-2">Governing Law</h2>
			<p className="mb-6">
				These terms are governed by the laws of Karnataka, India. Any disputes shall be
				resolved in the courts of Karnataka, India.
			</p>
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

export default Terms;
