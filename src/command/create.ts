import { input, select } from "@inquirer/prompts";
import { clone } from "../utils/clone";
import path from "path";
import fs from "fs-extra";
import axios, { AxiosResponse } from "axios";
import { name, version } from "../../package.json";
import { gt } from "lodash";
import chalk from "chalk";

interface TemplateInfo {
	name: string;
	downLoadUrl: string;
	description: string;
	branch: string;
}

export const templates: Map<string, TemplateInfo> = new Map([
	[
		"Vue-Template-GitHub",
		{
			name: "Vue3-Vite-TypeScript-Template",
			downLoadUrl: "https://github.com/Lpppsea9/Admin-Pro.git",
			description: "Vue3技术栈",
			branch: "master",
		},
	],
	[
		"Vue-Template-Gitee",
		{
			name: "Vue3-Template",
			downLoadUrl: "https://gitee.com/Lpppsea9/admin-pro.git",
			description: "Vue3技术栈",
			branch: "master",
		},
	],
	[
		"Vue-Template-GitLab",
		{
			name: "Vue3-Template",
			downLoadUrl: "https://jihulab.com/sea9/Admin-Pro.git",
			description: "Vue3技术栈",
			branch: "master",
		},
	],
]);

export const isOverWrite = (fileName: string) => {
	console.warn(`${fileName}文件夹存在`);
	console.log("文件夹名称", fileName);
	return select({
		message: "是否覆盖",
		choices: [
			{ name: "覆盖", value: true },
			{ name: "取消", value: false },
		],
	});
};

// 获取Npm信息
export const getNpmInfo = async (npmName: string) => {
	const npmUrl = `https://registry.npmjs.org/${npmName}`;
	let res = {};
	try {
		res = await axios.get(npmUrl);
	} catch (error) {
		console.error("获取npm包信息失败");
	}
	return res;
};

// 获取Npm最新版本
export const getNpmLatestVersion = async (name: string) => {
	const { data } = (await getNpmInfo(name)) as AxiosResponse;
	// console.log("ddd", data);
	return data["dist-tags"].latest;
};

// 比较本地Npm包和线上包的版本
export const checkNpmVersion = async (name: string, version: string) => {
	const latestVersion = await getNpmLatestVersion(name);
	console.log("最新", latestVersion);
	console.log("version", version);

	// 是否需要更新
	const isNeedUpdate = gt(latestVersion, version);
	console.log("是否", isNeedUpdate);
	if (isNeedUpdate) {
		console.warn(
			`检查到mit-cli最新版本： ${chalk.blackBright(
				latestVersion
			)}，当前版本是：${chalk.blackBright(version)}`
		);
		console.log(
			`可使用： ${chalk.yellow(
				"npm install mit-cli@latest"
			)}，或者使用：${chalk.yellow("mit-cli update")}更新`
		);
	}
	return isNeedUpdate;
};

// 创建
export async function create(projectName: string) {
	const templateList = Array.from(templates).map(
		(item: [string, TemplateInfo]) => {
			const [name, info] = item;
			return {
				name,
				value: name,
				description: info.description,
			};
		}
	);
	if (!projectName) {
		projectName = await input({ message: "请输入项目名称" });
	}

	// 如果文件夹存在，则提示是否覆盖
	const filePath = path.resolve(process.cwd(), projectName);
	if (fs.existsSync(filePath) && projectName) {
		const run = await isOverWrite(projectName);
		if (run) {
			await fs.remove(filePath);
		} else {
			return; //不覆盖直接结束
		}
	}
	if (fs.existsSync(filePath) && !projectName) {
		projectName = await input({ message: "请输入项目名称" });
		create(projectName);
		return;
	}

	// 检查版本更新
	await checkNpmVersion(name, version);

	const templateName = await select({
		message: "请选择模板",
		choices: templateList,
	});
	const info = templates.get(templateName);
	if (info) {
		const { downLoadUrl, branch } = info;
		clone(downLoadUrl, projectName, ["-b", `${branch}`]);
	}
}
