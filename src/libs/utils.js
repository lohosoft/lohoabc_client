import Config from "./config.js";
import Store from "./store.js";
import MyJaroWinkler from "./my_jaro_winkler.js";
import * as qwest from "qwest";

const word2index = require("../data/word2index.json");
// console.log(word2index);
const LocalWordMap = jsonToMap(JSON.stringify(word2index));
// console.log(MyJaroWinkler("app", "appple"));

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

exports.mapToJson = mapToJson;
exports.jsonToMap = jsonToMap;
exports.LocalWordMap = LocalWordMap;
exports.makeOptionLettersForCurrentCorrectLetter = makeOptionLettersForCurrentCorrectLetter;
