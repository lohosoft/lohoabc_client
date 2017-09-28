console.log("index.js");
require("./css/style.css");
import React from "react";
import ReactDom from "react-dom";
import { Provider } from "react-redux";
import App from "./components/App.js";
import Store from "./libs/store.js";
import Utils from "./libs/utils.js";

// get requet for last word , according reply from server to deside where to go
Utils.setScreenHeight();
Utils.check();

const app = document.getElementById("app");
ReactDom.render(
	<Provider store={Store}>
		<App />
	</Provider>,
	app
);
