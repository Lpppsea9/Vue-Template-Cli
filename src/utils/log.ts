import logSymbols from "log-symbols";

const log = {
	info: (message: string) => console.log(logSymbols.info, message),
	success: (message: string) => console.log(logSymbols.success, message),
	warning: (message: string) => console.log(logSymbols.warning, message),
	error: (message: string) => console.log(logSymbols.error, message),
};

export default log;
