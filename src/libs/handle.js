import * as qwest from "qwest";
import Config from "./config.js";
import Store from "./store.js";
import Err from "./err.js";
import Utils from "./utils.js";

function prepareData(word) {
	getRawOptionsWords(word);
}
function getRawOptionsWords(targetWord) {
	let requestUrl =
		Config.RootUrl + Config.ApiGetOptionsUrl + "?word=" + targetWord;

	qwest
		.get(requestUrl)
		.then(function(xhr, response) {
			console.log("got optoiins words : ", response);
			// Store.dispatch({
			// 	type: Config.FilterRawOptionsWords,
			// 	payload: {
			// 		word: targetWord,
			// 		data: JSON.parse(response)
			// 	}
			// });

			filterRawOptionsWords(targetWord, JSON.parse(response));
		})
		.catch(function(e, xhr, response) {
			Err.getRawOptionsWords(e, xhr, response);
		})
		.complete(function() {});
}

// return [{index:33,word:apple}]
function filterRawOptionsWords(word, data) {
	console.log("got word to filter :", data);
	console.log("filter for word :", word);
	let res = [];
	let res1 = [];
	for (var i = data.length - 1; i >= 0; i--) {
		console.log(data[i][0]);
		if (
			// MyJaroWinkler(word, data[i][0]) < 0.8 &&
			res.length < Config.OptionsImgsLimit &&
			Utils.LocalWordMap.has(data[i][0])
		) {
			res.push(data[i][0]);
			let index = Utils.LocalWordMap.get(data[i][0]);
			res1.push({ index: index, word: data[i][0] });
			// prepareOptionsImgData(index, word);
		}
	}
	console.log("filtered word is :", res1);
	for (var i = res1.length - 1; i >= 0; i--) {
		let index = res1[i].index;
		let word = res1[i].word;
		prepareOptionsImgData(index, word, 0);
	}
}

function prepareOptionsImgData(index, word, guessTime) {
	// check if word img got already
	console.log("prepare option image for :", index);
	let state = Store.getState();
	if (
		state.optionsImgsIndex.indexOf(index) === -1 &&
		guessTime <= Config.WordImgGuessLimit
	) {
		let wordImgUrlRoot = Config.RootUrl + Config.WordImgPath;
		let guessImgUrl =
			wordImgUrlRoot + index + "-thumb-" + guessTime + ".jpeg";

		console.log("try get guess imag with url : ", guessImgUrl);
		qwest
			.get(guessImgUrl, null, {
				timeout: Config.GuessWordImgTimout
			})
			.then(function(xhr, response) {
				console.log("guess word img xhr status is : ", xhr.status);
				if (xhr.status === 200) {
					let newImgData = {
						index: index,
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
				prepareOptionsImgData(index, word, guessTime + 1);
			})
			.complete(function() {});
	} else {
		// beyond guess time
		Err.guessWordImg(index, word);
	}

	console.log("new state is :", state);
}

exports.prepareData = prepareData;
