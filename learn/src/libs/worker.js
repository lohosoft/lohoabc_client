import Config from "./config.js";

const MyWorker = require("worker-loader!./worker_script.js");
let worker;

if (!Config.hasWorker) {
	// worker polyfill ==========  TODO
	console.log("use pseudo-worker");
	const PseudoWorker = require("pseudo-worker");
	worker = new PseudoWorker("./worker_script.js");
} else {
	worker = new MyWorker();
}

export default worker;
