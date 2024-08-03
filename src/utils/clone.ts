import { simpleGit, SimpleGit, SimpleGitOptions } from "simple-git";
import createLogger from "progress-estimator"; //展示进度条
import chalk from "chalk";
import log from "./log";

const logger = createLogger({
	spinner: {
		interval: 100, //变换时间
		frames: ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"].map((item) =>
			chalk.blue(item)
		),
	},
});

const gitOptions: Partial<SimpleGitOptions> = {
	baseDir: process.cwd(), //当前工作目录
	binary: "git",
	maxConcurrentProcesses: 6, //最大并发进程数
};

export const clone = async (
	url: string,
	prjName: string,
	options: string[]
) => {
	const git: SimpleGit = simpleGit(gitOptions);
	try {
		await logger(git.clone(url, prjName, options), "代码下载中...", {
			estimate: 8000, // 展示预估时间
		});
		// 下面就是一些相关的提示
		console.log();
		console.log(chalk.blueBright(`===================================`));
		console.log(chalk.blueBright(`=== 欢迎使用 mit-vue-cli 脚手架 ===`));
		console.log(chalk.blueBright(`===================================`));
		console.log();

		log.success(`项目创建成功 ${chalk.blueBright(prjName)}`);
		log.success(`执行以下命令启动项目：`);
		log.info(`cd ${chalk.blueBright(prjName)}`);
		log.info(`${chalk.yellow("pnpm")} install`);
		log.info(`${chalk.yellow("pnpm")} run dev`);
	} catch (error) {}
};
