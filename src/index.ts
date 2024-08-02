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
		console.log(`create ${dirName}`);
		create(dirName);
	});

program.parse();
