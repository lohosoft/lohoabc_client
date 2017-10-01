import Config from "./config.js";
import Utils from "./utils.js";
import MyHandle from "./handle.js";

// const request = require("superagent");
import * as qwest from "qwest";

export default function reducer(state, action) {
	switch (action.type) {
		case Config.ShowHelloDiv: {
			state = {
				...state,
				fetching: true,
				reporting: false
			};
			return state;
		}
		case Config.ShowReportDiv: {
			state = { ...state, fetching: false, reporting: true };
			return state;
		}
		case Config.PrepareReportData: {
			let newWordsRecords = action.payload;
			let oldWordsRecords = state.wordsRecords;
			state = {
				...state,
				wordsRecords: oldWordsRecords.concat(newWordsRecords)
			};
			return state;
		}
	}

	return state;
}
