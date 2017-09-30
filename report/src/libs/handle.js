import * as qwest from "qwest";
import Config from "./config.js";
import Store from "./store.js";
import MyError from "./err.js";
import Utils from "./utils.js";

function handleTimeoutError(errdata) {}
function showReportDiv(rawData) {
	let words = rawData.data;
	if (words.length === 0) {
		// not start learn yet
	} else {
		console.log(words);
	}
	Store.dispatch({ type: Config.ShowReportDiv, payload: words });
}
exports.handleTimeoutError = handleTimeoutError;
exports.showReportDiv = showReportDiv;
