import { Command } from "commander";
import { version } from "../package.json";
import { create } from "./command/create";

const program = new Command("auto-cli");
// console.log("sss");
// 查看cli版本
program.version(version, "-v, --version");

// 创建项目
program
	.command("create")
	.description("create a new program!")
	.argument("[name]", "项目名称")
	.action(async (dirName) => {
		create(dirName);
	});

try {
	program.parse();
} catch (error) {
	// if (error instanceof ExitPromptError) {
	console.log("用户强制关闭了提示。");
	// } else {
	// console.error("发生了其他错误：", error);
	// }
}
