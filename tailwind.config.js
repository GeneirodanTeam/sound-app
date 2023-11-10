/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
	theme: {
		extend: {
			screens: {
				xxl: "1537px",
			},
			colors: {
				myBlue: {
					100: "#241663",
					200: "#160F30",
				},
				myPurple: {
					100: "#DA4FC4",
					200: "#A72693",
					300: "#991E86",
					400: "#7B146B",
				},
				myYellow: "#EAE7AF",
			},
		},
	},
	plugins: [],
};
