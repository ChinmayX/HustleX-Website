import type { Config } from "tailwindcss";

const colors = {
	background: "hsl(0, 0%, 5%)",
	surface: "hsl(0, 0%, 10%)",
	giga_black: {
		0: "hsl(0, 0%, 0%)",
		100: "hsl(0, 0%, 2%)",
		200: "hsl(0, 0%, 4%)",
		300: "hsl(0, 0%, 8%)",
		350: "hsl(0, 0%, 12%)",
		400: "hsl(0, 0%, 16%)",
		500: "hsl(0, 0%, 32%)",
	},
	giga_white: {
		0: "hsl(0, 0%, 100%)",
		100: "hsl(0, 0%, 98%)",
		200: "hsl(0, 0%, 96%)",
		300: "hsl(0, 0%, 92%)",
		400: "hsl(0, 0%, 84%)",
		500: "hsl(0, 0%, 68%)",
	},
	pinx: {
		100: "hsl(315, 100%, 90%)",
		200: "hsl(315, 100%, 80%)",
		300: "hsl(315, 100%, 70%)",
		400: "hsl(315, 100%, 60%)",
		500: "hsl(315, 100%, 50%)",
	},
	blux: {
		100: "hsl(210, 100%, 50%)",
		200: "hsl(217, 100%, 50%)",
		300: "hsl(225, 100%, 50%)",
		400: "hsl(232, 100%, 50%)",
		500: "hsl(240, 100%, 50%)",
	},
	giga_tints: {
		red: "hsl(350, 100%, 60%)",
		yelw: "hsl(55, 100%, 60%)",
		grn: "hsl(150, 100%, 60%)",
		grnw: "hsl(150, 100%, 40%)",
		blu: "hsl(240, 100%, 60%)",
		mgta: "hsl(300, 100%, 60%)",
		prpl: "hsl(270, 100%, 60%)",
	},
	green: {
		100: "hsl(129, 67%, 88%)",
		300: "hsl(129, 67%, 76%)",
		500: "hsl(129, 67%, 64%)",
		700: "hsl(129, 67%, 52%)",
		900: "hsl(129, 68%, 40%)",
	},
	red: {
		100: "hsl(4, 100%, 94%)",
		300: "hsl(4, 100%, 85%)",
		500: "hsl(3, 100%, 73%)",
		700: "hsl(3, 100%, 61%)",
		900: "hsl(3, 100%, 49%)",
	},
};

const config: Config = {
	content: ["./src/**/*.{js,ts,jsx,tsx}"],
	theme: { extend: { colors } },
	darkMode: "class",
};

export default config;
