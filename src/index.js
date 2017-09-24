console.log("index.js");
require("./css/style.css");
import React from "react";
import ReactDom from "react-dom";
import { Provider } from "react-redux";
import Config from "./libs/config.js";
import App from "./components/App.js";
import Store from "./libs/store.js";
import Handle from "./libs/handle.js";
import Utils from "./libs/utils.js";

function init() {
	// if ("ontouchstart" in document.documentElement) {
	Utils.setScreenHeight();
	Store.dispatch({ type: Config.ShowOptionsDiv });
	Handle.prepareDataForWord("water");
	// } else {
	// 	console.log("show barcode here");
	// 	Store.dispatch({ type: Config.ShowHelloDiv });
	// }
}
init();

const app = document.getElementById("app");
ReactDom.render(
	<Provider store={Store}>
		<App />
	</Provider>,
	app
);
