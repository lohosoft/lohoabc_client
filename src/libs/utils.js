import Config from "./config.js";
import Store from "./store.js";
import myWorker from "./worker.js";
import * as qwest from "qwest";

// demo
// Utils.getWordTrans("banana", console.log);
function getWordTrans(word, callback) {
	myWorker.onmessage = function(e) {
		console.log("worker back data is : ", e.data);
		callback(e.data);
	};
	myWorker.postMessage({ type: "trans", word: word });
}

function getNearWords(word, number, callback) {
	myWorker.onmessage = function(e) {
		console.log("worker back data is : ", e.data);
		callback(e.data);
	};
	myWorker.postMessage({ type: "near", word: word, number: number });
}

function mapToJson(map) {
	return JSON.stringify([...map]);
}
function jsonToMap(jsonStr) {
	return new Map(JSON.parse(jsonStr));
}

function randLetter() {
	var letters = [
		"a",
		"b",
		"c",
		"d",
		"e",
		"f",
		"g",
		"h",
		"i",
		"j",
		"k",
		"l",
		"m",
		"n",
		"o",
		"p",
		"q",
		"r",
		"s",
		"t",
		"u",
		"v",
		"w",
		"x",
		"y",
		"z"
	];
	var letter = letters[Math.floor(Math.random() * letters.length)];
	return letter;
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
		let optionLetter = randLetter();
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
exports.wordToUrl = wordToUrl;
exports.urlToWord = urlToWord;
exports.shuffle = shuffle;
exports.getNearWords = getNearWords;
exports.getWordTrans = getWordTrans;
exports.setScreenHeight = setScreenHeight;
exports.getRandomInt = getRandomInt;
exports.mapToJson = mapToJson;
exports.jsonToMap = jsonToMap;
exports.makeOptionLettersForCurrentCorrectLetter = makeOptionLettersForCurrentCorrectLetter;
