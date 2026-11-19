import type { ReactNode } from "react";

import { Footer } from "./Footer";
import { Nav } from "./Nav";
import { Container } from "./ui";

/** Shell for Kin content pages (about, contact, legal). */
export const PageShell = ({ children }: { children: ReactNode }) => (
	<>
		<Nav />
		<main id="main" className="pt-28 md:pt-36 pb-24">
			<Container>{children}</Container>
		</main>
		<Footer />
	</>
);
