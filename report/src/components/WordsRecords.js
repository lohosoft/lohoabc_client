import React from "react";
import { connect } from "react-redux";
import WordRecords from "./WordRecords.js";
import createFragment from "react-addons-create-fragment";

class WordsRecords extends React.Component {
	constructor(props) {
		super(props);
		let wordsRecords1 = [];
		this.props.wordsRecords.map(wordRecords => {
			wordsRecords1.push(createFragment(wordRecords));
		});
		this.wordsRecords = this.process(wordsRecords1);
		console.log(
			"in wordsRecords processed wordsRecords",
			this.wordsRecords
		);
		this.wordOrder = this.getWordOrder(this.wordsRecords[0]);
		console.log("word order is ", this.wordOrder);
		this.recordsOrder = this.getRecordsOrder(this.wordsRecords[0]);
		console.log("records order is ", this.recordsOrder);
	}
	getWordOrder(data) {
		// word does not have any number
		for (var i = data.length - 1; i >= 0; i--) {
			if (!/\d/.test(data[i])) {
				return i;
			}
		}
	}
	getRecordsOrder(data) {
		// records string must has "[" and "]"
		for (var i = data.length - 1; i >= 0; i--) {
			if (data[i].indexOf("[") !== -1 && data[i].indexOf("]") !== -1) {
				return i;
			}
		}
	}
	process(rawWordsRecords) {
		let res1 = {};
		rawWordsRecords.map((rawWordRecords, i) => {
			// console.log(rawWordRecords);
			let word = rawWordRecords[4];
			let records = rawWordRecords[1];
			let ts = rawWordRecords[2];
			if (res1[word]) {
				let oldTs = res1[word][2];
				// console.log(oldTs);
				if (oldTs < ts) {
					res1[word] = rawWordRecords;
				}
			} else {
				res1[word] = rawWordRecords;
				// console.log(res1);
			}
		});
		// console.log(res1);
		let res = [];
		Object.keys(res1).map(function(key) {
			res.push(res1[key]);
		});
		console.log(res);
		return res;
	}
	componentDidMount() {
		// this.props.WordsRecords();
	}
	render() {
		return (
			<div className="wordsRecordsDiv">
				{this.wordsRecords.map((wordRecords, i) => {
					return (
						<WordRecords
							key={i}
							word={wordRecords[this.wordOrder]}
							records={wordRecords[this.recordsOrder]}
						/>
					);
				})}
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		// wordsRecords: state.wordsRecords
	};
};

const mapDispatchToProps = dispatch => {
	return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(WordsRecords);
