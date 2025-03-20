import DownloadSection from "../components/download";
import Footer from "../components/footer";
import { Maintenance } from "../components/maintenance";

export default function Home() {
	return (
		<div>
			<Maintenance />
			<DownloadSection />
			<Footer />
		</div>
	);
}
