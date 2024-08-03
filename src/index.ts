import { Command } from "commander";
import { version } from "../package.json";
import { create } from "./command/create";
import { update } from "./command/update";

const program = new Command("auto-cli");

// cli查看版本
program.version(version, "-v, --version");

// cli更新版本
program
	.command("update")
	.description("update mit-cli")
	.action(async () => {
		update();
	});

// cli创建项目
program
	.command("create")
	.description("create a new program")
	.argument("[name]", "项目名称")
	.action(async (dirName) => {
		create(dirName);
	});

program.parse();
