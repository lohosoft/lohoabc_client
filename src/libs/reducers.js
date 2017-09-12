import Config from "./config.js";
import Store from "./store.js";
import Utils from "./utils.js";
import Handle from "./handle.js";

// const request = require("superagent");
import * as qwest from "qwest";

export default function reducer(state, action) {
	switch (action.type) {
		case "DesignTestDiv": {
			let state = {
				...state,
				optioning: false,
				testing: true,
				fetching: false,
				testWord: "hello"
			};
			return state;
		}
		case Config.ClickOnOptionImg: {
			let target = action.payload;
			let index = target.id;
			let word = target.name;
			let url = target.src;
			state = {
				...state,
				// show test div
				optioning: false,
				fetching: false,
				testing: true,
				// update state
				testWord: word,
				testWordIndex: index,
				testWordImgUrl: url,
				// empty current options data for next word
				optionsImgs: [],
				optionsImgsIndex: []
			};
			Handle.prepareData(word);
			return state;
		}
		case Config.AddNewImgData: {
			let index = action.payload.index;
			let word = action.payload.word;
			let url = action.payload.url;
			let newOptionImg = { index: index, word: word, url: url };
			let newOptionsImgs = state.optionsImgs.concat(newOptionImg);
			let newOptionsImgsIndex = state.optionsImgsIndex.concat(index);
			state = {
				...state,
				optionsImgsIndex: newOptionsImgsIndex,
				optionsImgs: newOptionsImgs
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
