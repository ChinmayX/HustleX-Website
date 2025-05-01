import { IBM_Plex_Mono, Outfit, Playfair_Display } from "next/font/google";
import localFont from "next/font/local";

const playfairDisplay = Playfair_Display({
	subsets: ["latin"],
	weight: ["400", "900"],
	style: ["normal", "italic"],
});
const ibmPlexMono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "700"] });
const outfit = Outfit({ subsets: ["latin"], weight: ["400", "700"] });
const basement = localFont({ src: "../../public/fonts/Basement.woff2", weight: "400" });
const integralCF = localFont({ src: "../../public/fonts/IntegralCF-Bold.woff2", weight: "700" });

export { playfairDisplay, ibmPlexMono, outfit, basement, integralCF };
