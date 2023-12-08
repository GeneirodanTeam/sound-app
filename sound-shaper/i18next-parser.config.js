module.exports = {
	defaultNamespace: "Translation",
	lexers: {
		js: ["JsxLexer"], // we're writing jsx inside .js files
		default: ["JavascriptLexer"],
	},
	locales: ["en", "uk"],
	output: "src/locales/$LOCALE/$NAMESPACE.json",
	input: ["src/**/*.js"],
};
