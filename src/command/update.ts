import process from "child_process";
import ora from "ora";
import chalk from "chalk";

const spinner = ora({
	text: "mit-cli 正在更新...",
	spinner: {
		interval: 100,
		frames: ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"].map((item) =>
			chalk.blue(item)
		),
	},
});

export function update() {
	spinner.start();
	process.exec("npm install mit-cli@latest -g", (error) => {
		spinner.stop();
		if (!error) {
			console.log(chalk.green("更新成功"));
		} else {
			console.log(chalk.red(error));
		}
	});
}
