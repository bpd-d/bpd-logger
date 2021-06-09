const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

function DtsBundlePlugin() {}
// DtsBundlePlugin.prototype.apply = function (compiler) {
// 	compiler.plugin("done", function () {
// 		var dts = require("dts-bundle");
// 		dts.bundle({
// 			name: "bpd-toolkit",
// 			main: "dist/typings/logger.d.ts",
// 			out: "../logger.d.ts",
// 			removeSource: true,
// 			outputAsModuleFolder: true, // to use npm in-package typings
// 		});

// 		// Delete unneeded files
// 	});
// };
module.exports = merge(common, {
	mode: "production",
	devtool: "source-map",
	optimization: {
		runtimeChunk: false,
		minimize: false,
	},
	plugins: [new CleanWebpackPlugin()], //, new DtsBundlePlugin()],
});
