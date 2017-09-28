import Config from "./config.js";
import Store from "./store.js";
import MyError from "./err.js";
import MyWorker from "./worker.js";
import * as qwest from "qwest";

function check() {
	// let url = Config.apiRootUrl + Config.apiLastWordUrl;
	let url = "https://www.lohosoft.cn/api/abc/last_word";
	console.log("checking with url : ", url);
	// qwest.setDefaultDataType("json");
	qwest
		.get(url, null, { timeout: Config.apiConnectTimeout })
		.then(function(xhr, response) {
			// ok
			console.log("ok with response : ", response);
			if (response.status === "err") {
				if (response.code === Config.ErrCodeRequest) {
					// redirect to qr code page
					MyError.handle(Config.ErrCodeRequest);
					return;
				} else if (response.code === Config.ErrCodeDB) {
					MyError.handle(Config.DBErrInfo);
				} else if (response.code === Config.ErrCodeCache) {
					MyError.handle(Config.ErrCodeCache);
				} else {
				}
			} else if (response.status === "ok") {
				let word = response.data;
				if (word === []) {
					// make random word
				} else {
					// prepare options for word
				}
			} else {
				// unknown error
				MyError.handle(Config.ErrCodeUnknown);
			}
		})
		.catch(function(e, xhr, response) {
			// error beyond connection timeout
			console.log(e,xhr);
			console.log("error with response : ", response);
			MyError.handle(Config.ErrCodeApiConnectionTimeout, url);
		});
}

function getNearWords(word, number, callback) {
	MyWorker.onmessage = function(e) {
		if (e.data.type === "near") {
			console.log("worker back nears words data is : ", e.data);
			callback(e.data);
		}
	};
	MyWorker.postMessage({ type: "near", word: word, number: number });
}

function mapToJson(map) {
	return JSON.stringify([...map]);
}

function jsonToMap(jsonStr) {
	return new Map(JSON.parse(jsonStr));
}

function randLetter(letter) {
	let vowels = ["a", "e", "i", "o", "u", "y"];
	let consons = [
		"b",
		"c",
		"d",
		"f",
		"g",
		"h",
		"j",
		"k",
		"l",
		"m",
		"n",
		"p",
		"q",
		"r",
		"s",
		"t",
		"v",
		"w",
		"x",
		"z"
	];
	let whereToPick;
	if (vowels.indexOf(letter) === -1) {
		whereToPick = consons;
	} else {
		whereToPick = vowels;
	}
	var letter1 = whereToPick[Math.floor(Math.random() * whereToPick.length)];
	return letter1;
}

function shuffle(array) {
	let m = array.length,
		i;
	while (m) {
		i = (Math.random() * m--) >>> 0;
		[array[m], array[i]] = [array[i], array[m]];
	}
	return array;
}

function makeOptionLettersForCurrentCorrectLetter(letter) {
	let res = [];
	// =======================  TODO
	// given a ltter make various number other letter to make an array as options letter for testing
	// now just get 3 other random number
	for (var i = 0; i < Config.optionLetterLimitTemporary - 1; i++) {
		let optionLetter = randLetter(letter);
		if (res.indexOf(optionLetter) === -1 && optionLetter !== letter) {
			// if random int existed in options or equal to target , re make agin
			res.push(optionLetter);
		} else {
			i -= 1;
		}
	}

	res.push(letter);
	// shuffle it avoding target letter always at end
	let res1 = shuffle(res);

	return res1;
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
exports.shuffle = shuffle;
exports.getNearWords = getNearWords;
exports.setScreenHeight = setScreenHeight;
exports.getRandomInt = getRandomInt;
exports.mapToJson = mapToJson;
exports.jsonToMap = jsonToMap;
exports.makeOptionLettersForCurrentCorrectLetter = makeOptionLettersForCurrentCorrectLetter;
