import * as qwest from "qwest";
import Config from "./config.js";
import Store from "./store.js";
import Err from "./err.js";
import Utils from "./utils.js";

function prepareDataForWord(word) {
	// getRawOptionsWords(word);

	Utils.getNearWords(word, Config.queryNearWordsLimitation, showOptionsWords);
}

function showOptionsWords(callbackdata) {
	let word = callbackdata.word;
	// target word on first position of array
	let options = callbackdata.data;
	// remove first
	options.shift();
	// shuffle and get first 4
	options = Utils.shuffle(options).slice(0, 4);
	console.log("prepare OptionsWords for with : ", word, options);
	options.map(option => {
		// santinize words for phrase
		// convert comma , to space ' '
		// comma brought by graphlib handle symbol , maybe improve it later ====================  TODO
		if (option.indexOf(",") !== -1) {
			option = option.replace(/,/g, " ");
		}
		prepareOptionImgData(option);
	});
}

function prepareOptionImgData(word) {
	// check if word img got already
	console.log("prepare option image for :", word);
	let guessTime = 0;
	let state = Store.getState();
	if (
		state.optionsImgsWords.indexOf(word) === -1 &&
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
					let newImgData = {
						word: word,
						url: guessImgUrl
					};
					Store.dispatch({
						type: Config.AddNewImgData,
						payload: newImgData
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
		Err.guessWordImg(index, word);
	}

	// console.log("new state is :", state);
}

exports.prepareDataForWord = prepareDataForWord;
