import React from "react";
import { connect } from "react-redux";
import { responsiveVoice } from "../libs/responsivevoice.js";

const simpleDict = require("../data/simple_dict.js");
console.log(simpleDict);
class WordRecords extends React.Component {
	constructor(props) {
		super(props);
		console.log("wordRecords word : ", this.props.word);
		console.log("wordRecords records : ", this.props.records);
		this.key = this.props.key;
		this.word = this.props.word.split("");
		// console.log(this.word);
		// handle space between words for records array
		this.records1 = JSON.parse(this.props.records);
		// using following record for display
		this.records = [];
		let mark = 0;
		// if meet space ,push null into records
		// that makes records length equals word length
		this.word.map(letter => {
			if (letter !== " ") {
				this.records.push(this.records1[mark]);
				mark += 1;
			} else {
				this.records.push(null);
			}
		});
		console.log("in wordRecords prcoessed records", this.records);
	}
	getTrans(word) {
		console.log(word);
		// console.log(simpleDict[word]);
		if (!simpleDict[word]) {
			return "（此单词未收入当前词汇表）";
		} else {
			return simpleDict[word][0];
		}
	}
	componentDidMount() {
		// this.props.WordRecords();
	}

	clickOnWordRecordsDiv(target) {
		// console.log(target);
		responsiveVoice.speak(this.props.word, "US English Female", {
			rate: 0.8
		});
	}
	render() {
		return (
			<div
				className="wordRecordsDiv"
				onClick={e => this.clickOnWordRecordsDiv(e.target)}
			>
				<div className="wordRecordsWordDiv">
					{this.word.map((letter, i) => {
						if (letter === " ") {
							return <span key={i * 100}> </span>;
						} else {
							if (this.records[i] < 1) {
								return (
									<span key={i} className="greenLetter">
										{letter}
									</span>
								);
							} else if (
								this.records[i] >= 1 &&
								this.records[i] < 2
							) {
								return (
									<span key={i} className="blueLetter">
										{letter}
									</span>
								);
							} else if (
								this.records[i] >= 2 &&
								this.records[i] < 3
							) {
								return (
									<span key={i} className="yellowLetter">
										{letter}
									</span>
								);
							} else if (this.records[i] >= 3) {
								return (
									<span key={i} className="redLetter">
										{letter}
									</span>
								);
							}
						}
					})}
				</div>{" "}
				<div className="wordRecordsTransDiv">
					<p>{this.getTrans(this.props.word)}</p>{" "}
				</div>{" "}
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {};
};

const mapDispatchToProps = dispatch => {
	return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(WordRecords);
