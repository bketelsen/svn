const json = require('@rollup/plugin-json');
// Consult https://www.snowpack.dev to learn about these options
module.exports = {
	extends: '@sveltejs/snowpack-config',
	"plugins": ["@snowpack/plugin-sass"],
	installOptions: {
		rollup: {
			plugins: [json()],
		},
	}
};