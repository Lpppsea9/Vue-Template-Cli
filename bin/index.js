#!/usr/bin/env node
process.on("SIGINT", () => {
	console.log("Caught interrupt signal (Ctrl+C)");
	// 执行必要的清理工作，比如关闭服务器、清理资源等
	process.exit();
});

process.on("uncaughtException", (err) => {
	console.error("There was an uncaught error", err);
	process.exit(1); // 可以选择退出程序，也可以进行其他处理
});

require("../dist"); //执行打包好的dist/index.js文件
