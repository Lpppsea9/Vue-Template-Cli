import { defineConfig } from "rollup";
import typescript from "rollup-plugin-typescript2";
import commonjs from "@rollup/plugin-commonjs";
import nodeResolve from "@rollup/plugin-node-resolve"; // 用于帮助 Rollup 解析和处理 Node.js 模块（Node.js 的 CommonJS 模块规范）
import nodeExternals from "rollup-plugin-node-externals";
import terser from "@rollup/plugin-terser";
import json from "@rollup/plugin-json";

export default defineConfig({
	input: {
		index: "src/index.ts", // 打包入口文件
	},
	output: [
		{
			dir: "dist", // 输出目标文件夹
			format: "commonjs", // 输出 commonjs 文件
		},
	],
	plugins: [
		commonjs(),
		nodeResolve(),
		nodeExternals({
			devDeps: false, // 可以识别我们 package.json 中的依赖当作外部依赖处理 不会直接将其中引用的方法打包出来
		}),
		json(),
		typescript(),
		terser(),
	],
});
