const plugin = require("tailwindcss/plugin");
/**@type {import("@types/tailwindcss/tailwind-config").TailwindConfig} */
module.exports = {
	// Uncomment the line below to enable the experimental Just-in-Time ("JIT") mode.
	// https://tailwindcss.com/docs/just-in-time-mode
	mode: "jit",
	theme: {
		extend: {
			spacing: {
				fit: "fit-content",
			},
			animation: {
				loader: "spin 2.5s ease-in-out infinite",
			},
		},
	},
	variants: {},
	plugins: [
		plugin(function ({ addUtilities, addComponents, e, prefix, config }) {
			const newUtilities = {
				".vertical-rl": {
					writingMode: "vertical-rl",
				},
				".vertical-lr": {
					writingMode: "vertical-lr",
				},
				".upright": {
					"text-orientation": "upright",
				},
			};
			addUtilities(newUtilities);
		}),
	],
	purge: {
		// Filenames to scan for classes
		content: [
			"./src/**/*.html",
			"./src/**/*.js",
			"./src/**/*.jsx",
			"./src/**/*.ts",
			"./src/**/*.tsx",
			"./public/index.html",
		],
		// Options passed to PurgeCSS
		options: {
			// Whitelist specific selectors by name
			// safelist: [],
		},
	},
};
