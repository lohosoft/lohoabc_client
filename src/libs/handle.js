import * as qwest from "qwest";
import Config from "./config.js";
import Store from "./store.js";
import Err from "./err.js";
import Utils from "./utils.js";

function prepareNextOptionDataByWord(word) {
	// getRawOptionsWords(word);
	Utils.getNearWords(word, Config.queryNearWordsLimitation, prepareOptions);
}

function prepareOptions(callbackdata) {
	// target word on first position of array
	let options = callbackdata.data;
	// remove first
	options.shift();
	// shuffle and get first 4
	options = Utils.shuffle(options).slice(0, 4);
	options.map(option => {
		prepareOptionData(option, 0);
	});
}

function prepareOptionData(option, guessTime) {
	let word = option.word;
	let trans = option.trans;
	// check if word img got already
	console.log("prepare option data for :", word);
	let state = Store.getState();
	if (
		state.optionsWords.indexOf(word) === -1 &&
		guessTime <= Config.WordImgGuessLimit
	) {
		let guessImgUrl = Config.RootUrl;
		guessImgUrl += Config.WordImgPath;
		guessImgUrl += "pep-";
		guessImgUrl += Utils.wordToUrl(word);
		guessImgUrl += "-";
		guessImgUrl += guessTime;
		guessImgUrl += ".jpeg";

		console.log("try get guess imag with url : ", guessImgUrl);
		qwest
			.get(guessImgUrl, null, {
				timeout: Config.GuessWordImgTimout
			})
			.then(function(xhr, response) {
				console.log("guess word img xhr status is : ", xhr.status);
				if (xhr.status === 200) {
					console.log("got image : ", guessImgUrl);
					let newOptionData = {
						word: word,
						url: guessImgUrl,
						trans:trans
					};
					Store.dispatch({
						type: Config.AddNewOptionData,
						payload: newOptionData
					});
				}
			})
			.catch(function(e, xhr, response) {
				console.log(
					"guess word image not exist on server err :",
					xhr.status
				);
				prepareOptionImgData(word, guessTime + 1);
			})
			.complete(function() {});
	} else {
		// beyond guess time
		Err.guessWordImg(word);
	}

	// console.log("new state is :", state);
}

exports.prepareNextOptionDataByWord = prepareNextOptionDataByWord;
