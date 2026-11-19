// Spec sheet. `target: true` shows a "target" tag: every value is a target
// until it's been measured on production hardware. Flip to false once confirmed.

export const specs = {
	label: "Specs",
	headline: "The spec sheet.",
	targetTag: "target",
	todoValue: "TBA",
	note: "Kin is in active development. Values tagged target are design goals, not measurements, and may change.",
	rows: [
		{ label: "Size", value: "~36 × 60 mm", target: true },
		{
			label: "Mounting",
			value: "Magnetic. V-groove for barbells, flat magnetic base for weight stacks",
			target: true,
		},
		{ label: "Sensors", value: "6-axis IMU", target: true }, // TODO confirm
		{ label: "Connectivity", value: "Bluetooth Low Energy", target: true },
		{ label: "Battery", value: "~10 one-hour sessions per charge", target: true },
		{ label: "Charging", value: "USB-C", target: true },
		{ label: "Controls", value: "None. Wakes from the app.", target: true },
		{ label: "Updates", value: "Over-the-air via the app", target: true },
		{ label: "App", value: "iOS and Android", target: true },
		{ label: "Weight", value: "", target: true }, // TODO
		{ label: "In the box", value: "Kin, USB-C cable, lanyard", target: true }, // TODO confirm
	],
};
