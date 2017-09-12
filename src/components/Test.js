import React from "react";
import { connect } from "react-redux";
import { responsiveVoice } from "../libs/responsivevoice.js";
import Store from "../libs/store.js";
import Config from "../libs/config.js";

class Test extends React.Component {
	constructor(props) {
		super(props);
		this.showKeyboard = false;
		// use this mark to deside what to display word
		// at beginning  mark = 0 , show all letter of word
		// click on image will -1 on mark , and letter at end of work become bottom line
		// click on letter of keyboard will + 1 on mark ,and letter at begin of shows if answer is correct
		this.letterMark = 0;
		this.word = this.props.word;
		this.clickOnTestWordImg = this.clickOnTestWordImg.bind(this);
		this.clickOnLetterOfTestKeyword = this.clickOnLetterOfTestKeyword.bind(
			this
		);
		this.makeOptionLettersForCurrentCorrectLetter = this.makeOptionLettersForCurrentCorrectLetter.bind(
			this
		);
	}

	componentDidMount() {}

	makeOptionLettersForCurrentCorrectLetter(letter) {
		let res = [];
		// =======================  TODO
		// given a ltter make various number other letter to make an array as options letter for testing


		res.push(letter);
		return res;
	}
	clickOnLetterOfTestKeyword(target) {
		console.log("clicke on ", target);
		// judge intput if correct , right show it in green , wrong show it in red
		// this.answer += target.innerHTML;
		let answerLetter = target.innerHTML;

		if (answerLetter === this.props.word[this.letterMark]) {
			// if current letter is correct
			// remove a '_'
			// this.answerBottomLine = this.answerBottomLine.slice(0, -1);
			// // add correct letter
			// this.answerInput += answerLetter;
			// // compare answer to word
			// this.answer = this.answerInput + this.answerBottomLine;
			if (this.answer === this.props.word) {
				console.log("answer corrent , need show next options page");
				Store.dispatch({ type: Config.ShowOptionsDiv });
			} else {
				// not finish yet ,netx letter
				this.letterMark += 1;
			}
		} else {
			console.log(
				"input letter not correct or finished,maybe show something"
			);
		}
		this.forceUpdate();
	}
	clickOnTestWordImg() {
		console.log("click on test word img ", this.props.word);
		// responsiveVoice.speak("fuck you very much", "UK English Female", {
		// 	rate: 0.7
		// });
		responsiveVoice.speak(this.props.word, "US English Female", {
			rate: 0.8
		});
		this.letterMark += 1;
		console.log(
			"for click on word image ,current letter mark is :",
			this.letterMark
		);
		if (this.letterMark === this.props.word.length) {
			this.showKeyboard = true;
		}
		this.forceUpdate();
	}

	render() {
		// return <p>Testing</p>;
		// use local word to responds events changing ,
		// init with state.word;
		// click on image will make part of it become bottom line
		// click on test letter will show either correct answer letter or wrong sign
		let testShowWord = [];
		let letterOfKeyBoard = [];

		for (var i = 0; i < this.word.length; i++) {
			if (i < this.word.length - this.letterMark) {
				testShowWord.push(this.props.word[i]);
			} else {
				testShowWord.push("_");
			}
		}
		// prepare to shwo keyboard
		if (this.showKeyboard) {
			let targetLetterIndexOfWord =
				this.props.word.length - this.letterMark;
			console.log(
				"option letters make by target letter is : ",
				this.props.word[targetLetterIndexOfWord]
			);

			letterOfKeyBoard = this.makeOptionLettersForCurrentCorrectLetter(
				this.props.word[targetLetterIndexOfWord]
			);
			console.log("letter of keyboard is : ", letterOfKeyBoard);
		}

		if (!this.showKeyboard) {
			// show image for learning word
			return (
				<div className="testDiv">
					<div className="testWordDiv">
						<p>
							{testShowWord.map(letter => {
								return <span>{letter}</span>;
							})}
						</p>
					</div>

					<div className="testWordImgDiv">
						<img
							className="testImg"
							id={this.props.index}
							key={this.props.index}
							name={this.props.word}
							src={this.props.url}
							onClick={this.clickOnTestWordImg}
						/>
					</div>
				</div>
			);
		} else {
			// show keyboard for testing word
			return (
				<div className="testDiv">
					<div className="testWordDiv">
						<p>
							{testShowWord.map(letter => {
								return <span>{letter}</span>;
							})}
						</p>
					</div>
					<div className="testKeyboard">
						{letterOfKeyBoard.map(letter => {
							return <span>{letter}</span>;
						})}
					</div>
				</div>
			);
		}
	}
}

const mapStateToProps = state => {
	return {
		word: state.testWord,
		index: state.testWordIndex,
		url: state.testWordImgUrl
	};
};

const mapDispatchToProps = dispatch => {
	return {
		// getClick: () =>{}
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(Test);
