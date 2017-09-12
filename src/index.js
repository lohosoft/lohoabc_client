console.log("index.js");
require("./css/style.css");
import React from "react";
import ReactDom from "react-dom";
import { Provider } from "react-redux";
import Config from "./libs/config.js";
import App from "./components/App.js";
import Store from "./libs/store.js";
import Handle from "./libs/handle.js";

Store.subscribe(() => {
	console.log("store changed ", Store.getState());
});

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
function init() {
	// if ("ontouchstart" in document.documentElement) {
		setScreenHeight();

		Store.dispatch({ type: "DesignTestDiv" });
	// } else {
	// 	console.log("show barcode here");
	// 	Store.dispatch({ type: Config.ShowHelloDiv });
	// }
}
init();

function setScreenHeight() {
	let height = window.innerHeight;
	console.log("screen height is ", height);
	document.getElementById("app").style.height = height + "px";
}

const app = document.getElementById("app");
ReactDom.render(
	<Provider store={Store}>
		<App />
	</Provider>,
	app
);
