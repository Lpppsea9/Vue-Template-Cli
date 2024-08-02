import { input, select } from "@inquirer/prompts";
import { clone } from "../utils/clone";
import path from "path";
import fs from "fs-extra";

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
]);

export function isOverWrite(fileName: string) {
	console.warn(`${fileName}文件夹存在`);
	return select({
		message: "是否覆盖",
		choices: [
			{ name: "覆盖", value: true },
			{ name: "取消", value: false },
		],
	});
}

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
	if (fs.existsSync(filePath)) {
		const run = await isOverWrite(projectName);
		if (run) {
			await fs.remove(filePath);
		} else {
			return; //不覆盖直接结束
		}
	}

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
