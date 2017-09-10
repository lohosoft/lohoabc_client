import Config from "./config.js";
import Store from "./store.js";
import MyJaroWinkler from "./my_jaro_winkler.js";
import * as qwest from "qwest";

const word2index = require("./data/word2index.json");
// console.log(word2index);
const LocalWordMap = jsonToMap(JSON.stringify(word2index));
// console.log(MyJaroWinkler("app", "appple"));

function mapToJson(map) {
	return JSON.stringify([...map]);
}
function jsonToMap(jsonStr) {
	return new Map(JSON.parse(jsonStr));
}
exports.mapToJson = mapToJson;
exports.jsonToMap = jsonToMap;
exports.LocalWordMap = LocalWordMap;
