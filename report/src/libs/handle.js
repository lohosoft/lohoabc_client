import * as qwest from "qwest";
import Config from "./config.js";
import Store from "./store.js";
import MyError from "./err.js";
import Utils from "./utils.js";

function handleTimeoutError(errdata) {
	alert("链接超时，请检查您的网络链接。");
}
function prepareReportData(rawData) {
	console.log("rawData for report div : ", rawData);
	Store.dispatch({ type: Config.PrepareReportData, payload: rawData });
	setTimeout(showReportDiv, 1000);
}
function showReportDiv() {
	Store.dispatch({ type: Config.ShowReportDiv });
}
exports.handleTimeoutError = handleTimeoutError;
exports.prepareReportData = prepareReportData;
exports.showReportDiv = showReportDiv;
