import Config from "./config.js";
import Store from "./store.js";
import Utils from "./utils.js";
import Handle from "./handle.js";

// const request = require("superagent");
import * as qwest from "qwest";

export default function reducer(state, action) {
	switch (action.type) {
		case Config.SaveTestHis: {
			let data = action.payload;
			let newTestHis = state.testHis.concat({data});
			state = { ...state, testHis: newTestHis };
			Handle.postTestHis(data);
			return state;
		}
		case Config.ClickOnOptionImg: {
			let word = Utils.urlToWord(action.payload.word);
			let url = action.payload.url;
			let trans = action.payload.trans;
			state = {
				...state,
				// show test div
				optioning: false,
				fetching: false,
				testing: true,
				// update state
				testWord: word,
				testWordImgUrl: url,
				testWordTrans: trans,
				// empty current options data for next word
				optionsData: [],
				optionsWords: []
			};
			Handle.prepareNextOptionDataByWord(word);
			return state;
		}
		case Config.AddNewOptionData: {
			let word = action.payload.word;
			let url = action.payload.url;
			let trans = action.payload.trans;
			let newOption = { word: word, url: url, trans: trans };
			let newOptions = state.optionsData.concat(newOption);
			let newOptionsWords = state.optionsWords.concat(word);
			state = {
				...state,
				optionsData: newOptions,
				optionsWords: newOptionsWords
			};
			return state;
		}

		// control show which div
		case Config.ShowOptionsDiv: {
			state = {
				...state,
				fetching: false,
				testing: false,
				optioning: true
			};
			return state;
		}
		case Config.ShowTestDiv: {
			state = {
				...state,
				fetching: false,
				testing: true,
				optioning: false
			};
			return state;
		}
		case Config.ShowHelloDiv: {
			state = {
				...state,
				fetching: true,
				testing: false,
				optioning: false
			};
			return state;
		}
	}

	return state;
}

// qwest
// 	.get(guessImgUrl, null, {
// 		timeout: Config.GuessWordImgTimout
// 	})
// 	.then(function(xhr, response) {
// 	})
// 	.catch(function(e, xhr, response) {})
// 	.complete(function() {});
