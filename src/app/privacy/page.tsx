"use client";

import Link from "next/link";

import { Back } from "../../components/back";
import { Footer } from "../../components/footer";

import { playfairDisplay } from "../../ui/ui";

const Privacy = () => (
	<div className="flex flex-col items-center w-full bg-white text-justify">
		<Back />
		<div className="px-10 pb-20 w-full xl:w-5xl text-black">
			<h1 className="text-4xl font-bold mt-10 mb-2 text-left xl:text-justify">
				<span className={`${playfairDisplay.className} italic text-blue-600`}>Privacy</span>{" "}
				Policy
			</h1>
			<p className="mb-4 font-semibold">Effective Date: 28-06-2024</p>
			<p className="mb-6">
				Welcome to HustleX! Your privacy is important to us, and we are committed to
				protecting your personal data. This Privacy Policy outlines how we collect, use, and
				protect the information you provide while using our app and services.
			</p>
			<h2 className="text-2xl font-semibold mb-2">Who We Are</h2>
			<p className="mb-6">
				HustleX is operated by XElite Studios Pvt. Ltd. based in Karnataka, India. For any
				questions or concerns regarding this policy, please contact us at the details
				provided below.
			</p>
			<h2 className="text-2xl font-semibold mb-2">Data We Collect</h2>
			<h3 className="text-lg font-semibold mb-2">Personal Information</h3>
			<ul className="mb-4 list-disc list-inside">
				<li>First and Last Name</li>
				<li>Email Address</li>
				<li>Phone Number</li>
				<li>Address, State, and Pin Code</li>
				<li>Account Profile Picture (optional)</li>
			</ul>
			<h3 className="text-lg font-semibold mb-2">Device Permissions</h3>
			<ul className="mb-4 list-disc list-inside">
				<li>
					<strong>Camera:</strong> Required for taking photos, capturing workout posture,
					and scanning codes.
				</li>
				<li>
					<strong>Microphone:</strong> Used for recording audio for speech recognition and
					other voice-related features.
				</li>
				<li>
					<strong>Fitness:</strong>
					<ul className="ml-4 list-disc list-inside">
						<li>
							<strong>Steps:</strong> Needed to track the number of steps taken
							throughout the day and monitor daily activity levels.
						</li>
						<li>
							<strong>Active Calories Burned:</strong> Measures calories burned during
							movement and exercise to help track physical activity.
						</li>
						<li>
							<strong>Total Calories Burned:</strong> Determines both active and
							resting calorie burn to help you reach your fitness goals.
						</li>
						<li>
							<strong>Distance:</strong> Used to calculate the distance covered while
							walking or running to help track your fitness progress.
						</li>
						<li>
							<strong>In-App Purchases:</strong> Allows you to make purchases in the
							store and access HustleX Premium.
						</li>
					</ul>
				</li>
			</ul>
			<h3 className="text-lg font-semibold mb-2">Usage Data</h3>
			<p className="mb-6">
				We collect information about your app usage to improve performance and personalize
				your experience.
			</p>
			<h2 className="text-2xl font-semibold mb-2">How We Use Your Data</h2>
			<ul className="mb-6 list-disc list-inside">
				<li>Rewarding fitness achievements and tracking progress.</li>
				<li>Sending promotional or service-related emails (only if you opt in).</li>
				<li>
					Analyzing app usage and improving user experience using <strong>PostHog</strong>
					. Learn more about their privacy practices{" "}
					<Link
						href="https://posthog.com/privacy"
						target="_blank"
						rel="noreferrer"
						className="text-blue-600"
					>
						here
					</Link>
					.
				</li>
				<li>
					Processing payments via <strong>Apple In-App Purchase</strong>,{" "}
					<strong>Google Play Billing</strong>, <strong>RevenueCat</strong>, and{" "}
					<strong>Cashfree Payments</strong>.
				</li>
				<li>
					Marketing and remarketing through services like <strong>Google Ads</strong>,{" "}
					<strong>Facebook Ads</strong>, and <strong>Twitter Ads</strong>.
				</li>
			</ul>
			<h2 className="text-2xl font-semibold mb-2">Data Sharing</h2>
			<p className="mb-6">
				We may share your data with trusted third-party service providers who assist us in
				operating our app or servicing you. These third parties are obligated to keep your
				information secure and use it only for the purposes we specify.
			</p>
			<h2 className="text-2xl font-semibold mb-2">Payment Processing</h2>
			<p className="mb-2">
				We do not store or handle your payment information directly. Payments are processed
				securely through trusted platforms:
			</p>
			<ul className="mb-6 list-disc list-inside">
				<li>Apple In-App Purchase</li>
				<li>Google Play Billing</li>
				<li>RevenueCat</li>
				<li>Cashfree Payments</li>
			</ul>
			<h2 className="text-2xl font-semibold mb-2">Advertising</h2>
			<p className="mb-6">
				HustleX does not display advertisements within the app. However, we use external
				remarketing services to advertise on platforms like Google, Facebook, and Twitter.
			</p>
			<h2 className="text-2xl font-semibold mb-2">Your Choices</h2>
			<ul className="mb-6 list-disc list-inside">
				<li>
					<strong>Email Communication:</strong> You can opt-out of promotional emails at
					any time by clicking the unsubscribe link in the email or contacting us
					directly.
				</li>
				<li>
					<strong>Device Permissions:</strong> You can manage app permissions through your
					device settings. Note that disabling certain permissions may limit app
					functionality.
				</li>
			</ul>
			<h2 className="text-2xl font-semibold mb-2">Data Protection</h2>
			<p className="mb-6">
				We take reasonable technical and organizational measures to protect your personal
				data from unauthorized access, misuse, or disclosure.
			</p>
			<h2 className="text-2xl font-semibold mb-2">Third-Party Services</h2>
			<p className="mb-2">
				HustleX integrates with third-party services for analytics and marketing purposes.
				These services have their own privacy policies:
			</p>
			<ul className="mb-6 list-disc list-inside">
				<li>
					<strong>Analytics:</strong> PostHog (
					<Link
						href="https://posthog.com/privacy"
						target="_blank"
						rel="noreferrer"
						className="text-blue-600"
					>
						Privacy Policy
					</Link>
					)
				</li>
				<li>
					<strong>Remarketing Services:</strong> Google Ads, Facebook Ads, and Twitter Ads
				</li>
				<li>
					<strong>Error and Crash Reporting:</strong> Sentry (
					<Link
						href="https://sentry.io/privacy/"
						target="_blank"
						rel="noreferrer"
						className="text-blue-600"
					>
						Privacy Policy
					</Link>
					)
				</li>
				<li>
					<strong>Payment Processing:</strong> Apple In-App Purchase, Google Play Billing,
					RevenueCat (
					<Link
						href="https://www.revenuecat.com/privacy"
						target="_blank"
						rel="noreferrer"
						className="text-blue-600"
					>
						Privacy Policy
					</Link>
					), Cashfree Payments (
					<Link
						href="https://www.cashfree.com/privacy-policy"
						target="_blank"
						rel="noreferrer"
						className="text-blue-600"
					>
						Privacy Policy
					</Link>
					)
				</li>
			</ul>
			<h2 className="text-2xl font-semibold mb-2">Data Retention</h2>
			<p className="mb-6">
				We retain personal data only as long as necessary for the purposes outlined in this
				policy or as required by law.
			</p>
			<h2 className="text-2xl font-semibold mb-2">Children’s Privacy</h2>
			<p className="mb-6">
				HustleX is not intended for children under the age of 18. We do not knowingly
				collect personal data from children. If you are a parent or guardian and believe
				your child has provided us with personal data, please contact us immediately.
			</p>
			<h2 className="text-2xl font-semibold mb-2">Changes to This Privacy Policy</h2>
			<p className="mb-6">
				We may update this policy from time to time. Changes will be reflected on this page,
				and we encourage you to review this policy periodically.
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

export default Privacy;
