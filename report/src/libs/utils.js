import Config from "./config.js";
import MyError from "./err.js";
import MyHandle from "./handle.js";

import * as qwest from "qwest";

function check() {
	// let url = Config.apiRootUrl + Config.apiLastWordUrl;
	let url = "https://www.lohosoft.cn/api/abc/all_words";
	console.log("checking with url : ", url);
	// qwest.setDefaultDataType("json");
	qwest
		.get(url, null, { timeout: Config.apiGetTimeout })
		.then(function(xhr, response) {
			// ok
			console.log("ok with response : ", response);
			if (response.status === "err") {
				if (response.code === Config.ErrCodeRequest) {
					// uid not in cookies
					// redirect to qr code page
					MyError.handle(Config.ErrCodeRequest);
				} else if (response.code === Config.ErrCodeDB) {
					// database error in server fatal error ================= TODO
					MyError.handle(Config.ErrCodeDB);
				} else if (response.code === Config.ErrCodeCache) {
					// uid in cookie but not in server uid cache
					// redirect to login again
					MyError.handle(Config.ErrCodeCache);
				} else {
					// unkown error
					MyError.handle(Config.ErrCodeUnknown);
				}
			} else if (response.status === "ok") {
				MyHandle.showReportDiv(response);
			} else {
				// unknown error
				MyError.handle(Config.ErrCodeUnknown);
			}
		})
		.catch(function(e, xhr, response) {
			// error beyond connection timeout
			console.log(e, xhr);
			MyError.handle(Config.ErrCodeApiConnectionTimeout, url);
		});
}

function mapToJson(map) {
	return JSON.stringify([...map]);
}

function jsonToMap(jsonStr) {
	return new Map(JSON.parse(jsonStr));
}

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function setScreenHeight() {
	let height = window.innerHeight;
	console.log("screen height is ", height);
	document.getElementById("app").style.height = height + "px";
}

function urlToWord(url) {
	return url.replace(/_/gi, " ").toLowerCase();
}

function wordToUrl(word) {
	return word.replace(/[^A-Za-z0-9]/gi, "_").toLowerCase();
}

exports.check = check;
exports.wordToUrl = wordToUrl;
exports.urlToWord = urlToWord;
exports.setScreenHeight = setScreenHeight;
exports.getRandomInt = getRandomInt;
exports.mapToJson = mapToJson;
exports.jsonToMap = jsonToMap;
