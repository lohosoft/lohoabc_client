"use strict";

const graphlib = require("graphlib");
const Graph = graphlib.Graph;
const dictGraphJson = require("../data/dict_graph.json");
let graph = new Graph();

init();
function init() {
	graph = graphlib.json.read(dictGraphJson);
	if (graph) {
		console.log("dict graph is ready!");
	} else {
		throw new Error("dict graph not working");
		alert("worker dict graph not working");
	}
}
self.onmessage = function(e) {
	let data = e.data;
	let word = data.word;
	console.log("worker got data : ", data);
	if (data.type === "trans") {
		let trans = graph.node(word);
		self.postMessage({ type: "trans", word: word, data: trans });
	}

	if (data.type === "near") {
		let word = data.word;
		let number = data.number;
		queryNearWords(word, number);
	}
};

function queryNearWords(target, number) {
	let res = [target];
	while (res.length < number + 1) {
		for (let i = res.length - 1; i >= 0; i--) {
			let nears = graph.neighbors(res[i]);
			for (let i = nears.length - 1; i >= 0; i--) {
				if (res.indexOf(nears[i]) === -1) {
					res.push(nears[i]);
				}
			}
		}
	}
	self.postMessage({ type: "near", word: target, data: res });
}
