import axios from "axios";
// const npmUrl = `https://registry.npmjs.org/mit-cli`;
const npmUrl = `https://registry.npmjs.org/dawei-cli`;

const getInfo = async () => {
	const data = await axios.get(npmUrl);
	console.log("d", data);
};

getInfo();
