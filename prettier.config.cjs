/**
 * @type {import("prettier").Config}
 */
module.exports = {
	tabWidth: 4,
	useTabs: true,
	trailingComma: "all",
	singleQuote: false,
	bracketSpacing: true,
	arrowParens: "avoid",
	printWidth: 100,
	bracketSameLine: false,
	semi: true,
	quoteProps: "consistent",
	importOrder: [
		"^react(.*)$",
		"<BUILTIN_MODULES>",
		"",
		"<THIRD_PARTY_MODULES>",
		"",
		"^(.*)assets(.*)$",
		"",
		"^@/components(.*)$",
		"",
		"^@/ui(.*)$",
		"",
		"^[.]",
	],
	importOrderTypeScriptVersion: "5.0.0",
	plugins: ["@ianvs/prettier-plugin-sort-imports"],
};
