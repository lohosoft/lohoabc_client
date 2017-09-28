import * as qwest from "qwest";
import Config from "./config.js";
import Store from "./store.js";
import MyError from "./err.js";
import Utils from "./utils.js";

function showOptionsDiv() {
	Store.dispatch({ type: Config.ShowOptionsDiv });
}

function handleTimeoutError(errdata) {
	if (errdata.indexOf("last_word") !== -1) {
		// handle get last word timeout error
		let begin = setInterval(countDown, 1000);
		let count = 6;
		function countDown() {
			count -= 1;
			Store.dispatch({ type: Config.ReConnectCountDown, payload: count });
			console.log(count);
			if (count <= 0) {
				clearInterval(begin);
				Utils.check();
			}
		}
	}
}
// { word: this.word, his: this.testLetterHis };
function postTestHis(rawData) {
	// process raw data into json data
	// then post it
	console.log("handle test his data : ", rawData);
	let word = rawData.word;
	let his = rawData.his;
	//  ================================================
	// hard to understand by the code explanation here:
	// res is for each letter record
	// res1 is for whole record of a word
	// score is  1 or 0
	// if score is 1 ,means wrong letter
	// if score is 0 ,means finaly right letter
	// for example : [1,0,0,1,1,0,1,0,1,1,1,0] should divide by :
	// [1,0,| 0, | 1,1,0, | 1,0, | 1,1,1,0]
	// count every 1 till meet 0 ,
	// if 0 by 0 , just push 0,
	// =================================================
	let res = 0;
	let res1 = [];
	his.map(score => {
		if (score === 1) {
			res += 1;
		} else {
			res1.push(res);
			res = 0;
		}
	});
	console.log("handled result is : ", res1);
	let postdata = { word: word, his: res1 };

	qwest.setDefaultDataType("json");
	qwest
		.post(Config.ApiPostTestHisUrl, postdata)
		.then(function(xhr, response) {
			// ok
			console.log("ok with response : ", response);
		})
		.catch(function(e, xhr, respose) {
			// error
			console.log("error with response : ", response);
		});
}

function prepareNextOptionDataByWord(word) {
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
	console.log("for time : ", guessTime);
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
						trans: trans
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
				prepareOptionData(option, guessTime + 1);
			})
			.complete(function() {});
	} else {
		// beyond guess time
		MyError.handle(Config.ErrCodeOverOptionImgGuessTime, word);
	}

	// console.log("new state is :", state);
}
exports.showOptionsDiv = showOptionsDiv;
exports.handleTimeoutError = handleTimeoutError;
exports.prepareNextOptionDataByWord = prepareNextOptionDataByWord;
exports.postTestHis = postTestHis;
