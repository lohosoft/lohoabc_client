import React from "react";
import { connect } from "react-redux";
import { responsiveVoice } from "../libs/responsivevoice.js";
import Store from "../libs/store.js";
import Config from "../libs/config.js";
import Utils from "../libs/utils.js";

class Test extends React.Component {
	constructor(props) {
		super(props);
		this.showKeyboard = false;
		this.showWordImg = true;
		this.showCorrectSign = false;
		// use this mark to deside what to display word
		// at beginning  mark = 0 , show all letter of word
		// click on image will -1 on mark , and letter at end of work become bottom line
		// click on letter of keyboard will + 1 on mark ,and letter at begin of shows if answer is correct
		this.letterMark = 0;
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
	}
	clickOnLetterOfTestKeyword(target) {
		// judge intput if correct , right show it in green , wrong show it in red
		// this.answer += target.innerHTML;
		let answerLetter = target.innerHTML;
		let correctLetter = this.props.word[
			this.props.word.length - this.letterMark
		];
		console.log("clicke on ", answerLetter);
		console.log("correct letter is ", correctLetter);
		this.testLetterHis.push({
			target: correctLetter,
			answer: answerLetter
		});

		// ===================================================. TODO
		// notice store to save click letter history into sate

		if (answerLetter === correctLetter) {
			console.log("current lettermakr is : ", this.letterMark);

			this.letterMark -= 1;
			this.forceUpdate();

			if (this.letterMark === 0) {
				// all correnct do next
				console.log(" correct all letter , got pass");
				this.showKeyboard = false;
				this.finishTest();
			}
		} else {
			console.log("wrong letter pick,do nothing yet");
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
		this.letterMark += 1;
		console.log(
			"for click on word image ,current letter mark is :",
			this.letterMark
		);
		if (this.letterMark === this.props.word.length) {
			this.showWordImg = false;
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

			letterOfKeyBoard = Utils.makeOptionLettersForCurrentCorrectLetter(
				this.props.word[targetLetterIndexOfWord]
			);
			console.log("letter of keyboard is : ", letterOfKeyBoard);

			// show keyboard for testing word
			return (
				<div className="testDiv">
					<div className="testWordDiv">
						<p>
							{testShowWord.map((letter, i) => {
								return <span key={i}>{letter}</span>;
							})}
						</p>
					</div>
					<div className="testKeyboard">
						{letterOfKeyBoard.map(letter => {
							return (
								<span
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
							{testShowWord.map((letter, i) => {
								return <span key={i}>{letter}</span>;
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
		}

		if (this.showCorrectSign) {
			return (
				<div className="testDiv">
					<div className="testWordDiv">
						<p>
							{testShowWord.map((letter, i) => {
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
		index: state.testWordIndex,
		url: state.testWordImgUrl
	};
};

const mapDispatchToProps = dispatch => {
	return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(Test);
