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
				fetching: true
			};
			return state;
		}
	}

	return state;
}
