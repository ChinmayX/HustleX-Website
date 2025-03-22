import DownloadSection from "../components/download";
import Footer from "../components/footer";
import Hero from "../components/hero";
import { Maintenance } from "../components/maintenance";

export default function Home() {
	return (
		<div>
			<Hero />
			<DownloadSection />
			<Footer />
		</div>
	);
}
