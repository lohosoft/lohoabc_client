console.log("index.js");
require("./css/style.css");
import React from "react";
import ReactDom from "react-dom";
import { Provider } from "react-redux";
import Config from "./config.js";
import App from "./components/App.js";
import Store from "./store.js";
import Handle from "./handle.js";
Store.subscribe(() => {
	console.log("store changed ", Store.getState());
});

// console.log("store changed ", Store.getState());

// Store.dispatch({ type: Config.INIT, payload: null });
// Store.dispatch({ type: Config.GuessWordImg, payload: {index:,word:word,guessTime} });

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
function init() {
	if ("ontouchstart" in document.documentElement) {
		let height = window.innerHeight;
		console.log("screen height is ", height);
		document.getElementById("app").style.height = height + "px";
		let randomWord = [
			"tree",
			"apple",
			"back",
			"green",
			"yellow",
			"farmer",
			"pot",
			"bath",
			"cake",
			"girl",
			"garden",
			"brick"
		];
		let guessWordIndex = getRandomInt(0, randomWord.length);
		Handle.prepareData(randomWord[guessWordIndex]);
		Store.dispatch({ type: Config.ShowOptionsDiv });
	} else {
		console.log("show barcode here");
		Store.dispatch({ type: Config.ShowHelloDiv });
	}
}
init();
const app = document.getElementById("app");
ReactDom.render(
	<Provider store={Store}>
		<App />
	</Provider>,
	app
);
