import * as qwest from "qwest";
import Config from "./config.js";
import Store from "./store.js";
import MyError from "./err.js";
import Utils from "./utils.js";

function handleTimeoutError(errdata) {}
function showReportDiv(rawData) {
	if (rawData === 0) {
		// not start learn yet
	} else {
		console.log("rawData for report div : ", rawData);
	}
	Store.dispatch({ type: Config.ShowReportDiv, payload: rawData });
}
exports.handleTimeoutError = handleTimeoutError;
exports.showReportDiv = showReportDiv;
