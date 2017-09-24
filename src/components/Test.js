import React from "react";
import { connect } from "react-redux";
import { responsiveVoice } from "../libs/responsivevoice.js";
import Store from "../libs/store.js";
import Config from "../libs/config.js";
import Utils from "../libs/utils.js";

class Test extends React.Component {
	constructor(props) {
		super(props);
		this.showTestWordLetters = this.props.word.split("");
		// at init testWordLetters equals showTestWordLetters
		// but testWordLetters keep static for reffrence to showTestWordLetters
		this.testWordLetters = this.showTestWordLetters;
		this.testWordTrans = this.props.trans;
		this.showLettersNumber = this.showTestWordLetters.length;
		this.showKeyboard = false;
		this.showWordImg = true;
		this.showCorrectSign = false;
		// how many bottom line need to show ?
		// don't touch space in phrase
		this.bottomLineNumber = 0;
		this.targetLetter;
		this.testLetterHis = [];
		this.word = this.props.word;
		this.clickOnTestWordImg = this.clickOnTestWordImg.bind(this);
		this.clickOnLetterOfTestKeyword = this.clickOnLetterOfTestKeyword.bind(
			this
		);
	}

	componentDidMount() {}
	finishTest() {
		console.log(
			"test for current word is finising,need save data into store.state : ",
			this.testLetterHis
		);
		this.showCorrectSign = true;
		this.forceUpdate();
		//=====================.  go next after timeout 2 second ==============. TODO
		setTimeout(this.nextOptions, 2000);
	}

	nextOptions() {
		Store.dispatch({ type: Config.ShowOptionsDiv });
	}
	clickOnLetterOfTestKeyword(target) {
		// judge intput if correct , right show it in green , wrong show it in red
		// this.answer += target.innerHTML;
		let answerLetter = target.innerHTML;

		console.log("clicke on ", answerLetter);
		console.log("correct letter is ", this.targetLetter);

		// ===================================================. TODO
		// notice store to save click letter history into state

		// click on right letter need update interface
		if (answerLetter === this.targetLetter) {
			let tempArray = [];
			this.testWordLetters.map((letter, i) => {
				if (i <= this.showLettersNumber - this.bottomLineNumber) {
					tempArray.push(letter);
				} else if (letter === " ") {
					// meet space , over it go next letter
					tempArray.push(letter);
				} else {
					tempArray.push("_");
				}
			});

			this.showTestWordLetters = tempArray;

			console.log("showTestWordLetters is ", this.showTestWordLetters);
			// this.forceUpdate();
			this.bottomLineNumber -= 1;
			if (this.bottomLineNumber === 0) {
				// all correnct do next
				console.log(" correct all letter , got pass");
				this.showKeyboard = false;
				this.finishTest();
			} else {
				this.forceUpdate();
			}
		} else {
			// click on wrong letter , record it and do nothing with interface
			console.log("wrong letter pick,record it");
			this.testLetterHis.push({
				target: this.targetLetter,
				answer: answerLetter
			});
			console.log(this.testLetterHis);
		}
	}
	clickOnTestWordImg() {
		console.log("click on test word img ", this.props.word);
		// responsiveVoice.speak("fuck you very much", "UK English Female", {
		// 	rate: 0.7
		// });
		responsiveVoice.speak(this.props.word, "US English Female", {
			rate: 0.8
		});

		this.bottomLineNumber += 1;
		console.log("bottomLineNumber is ", this.bottomLineNumber);

		// edit showTestWordLetters to display
		let tempArray = [];
		this.testWordLetters.map((letter, i) => {
			if (i < this.showLettersNumber - this.bottomLineNumber) {
				tempArray.push(letter);
			} else if (letter === " ") {
				tempArray.push(letter);
			} else {
				tempArray.push("_");
			}
		});

		this.showTestWordLetters = tempArray;

		if (this.bottomLineNumber === this.showLettersNumber) {
			this.showWordImg = false;
			this.showKeyboard = true;
		}
		this.forceUpdate();
	}

	render() {
		// click on image will make part of it become bottom line
		// click on test letter will show either correct answer letter or wrong sign
		// prepare to show keyboard
		if (this.showKeyboard) {
			let letterOfKeyBoard;
			let targetLetterIndex =
				this.showLettersNumber - this.bottomLineNumber;
			this.targetLetter = this.word[targetLetterIndex];
			if (this.targetLetter === " ") {
				this.bottomLineNumber -= 1;
				targetLetterIndex += 1;
			}
			this.targetLetter = this.word[targetLetterIndex];
			letterOfKeyBoard = Utils.makeOptionLettersForCurrentCorrectLetter(
				this.targetLetter
			);
			console.log("letter of keyboard is : ", letterOfKeyBoard);

			// show keyboard for testing word
			return (
				<div className="testDiv">
					<div className="testWordDiv">
						<p>
							{this.showTestWordLetters.map((letter, i) => {
								return <span key={i}>{letter}</span>;
							})}
						</p>
					</div>
					<div className="testWordTransDiv">
						<p>{this.testWordTrans}</p>
					</div>
					<div className="testKeyboard">
						{letterOfKeyBoard.map((letter, i) => {
							return (
								<span
									key={i}
									onClick={e =>
										this.clickOnLetterOfTestKeyword(
											e.target
										)}
								>
									{letter}
								</span>
							);
						})}
					</div>
				</div>
			);
		}

		if (this.showWordImg) {
			// show image for learning word
			return (
				<div className="testDiv">
					<div className="testWordDiv">
						<p>
							{this.showTestWordLetters.map((letter, i) => {
								return <span key={i}>{letter}</span>;
							})}
						</p>
					</div>
					<div className="testWordTransDiv">
						<p>{this.testWordTrans}</p>
					</div>
					<div className="testWordImgDiv">
						<img
							className="testImg"
							key={this.props.word}
							name={this.props.word}
							src={this.props.url}
							onClick={this.clickOnTestWordImg}
						/>
					</div>
				</div>
			);
		}

		if (this.showCorrectSign) {
			return (
				<div className="testDiv">
					<div className="testWordDiv">
						<p>
							{this.showTestWordLetters.map((letter, i) => {
								return <span key={i}>{letter}</span>;
							})}
						</p>
					</div>
					<div className="testFinishDiv">
						<p>Good!</p>
					</div>
				</div>
			);
		}
	}
}

const mapStateToProps = state => {
	return {
		word: state.testWord,
		trans: state.testWordTrans,
		url: state.testWordImgUrl
	};
};

const mapDispatchToProps = dispatch => {
	return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(Test);
