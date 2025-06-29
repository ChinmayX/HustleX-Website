import { IBM_Plex_Mono, Instrument_Serif, Outfit, Playfair_Display } from "next/font/google";
import localFont from "next/font/local";

const playfairDisplay = Playfair_Display({
	subsets: ["latin"],
	weight: ["400", "900"],
	style: ["normal", "italic"],
});
const ibmPlexMono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "700"] });
const outfit = Outfit({ subsets: ["latin"], weight: ["400", "700"] });
const basement = localFont({ src: "../../public/fonts/Basement.woff2", weight: "400" });

export const instrumentSerif = Instrument_Serif({
	subsets: ["latin"],
	weight: ["400"], // You can add other weights if needed
	variable: "--font-instrument-serif", // optional if using CSS variables
	display: "swap",
});

export { playfairDisplay, ibmPlexMono, outfit, basement };
