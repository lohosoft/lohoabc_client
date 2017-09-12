import React from "react";
import { connect } from "react-redux";
import { responsiveVoice } from "../libs/responsivevoice.js";
import Store from "../libs/store.js";
import Config from "../libs/config.js";

class Test extends React.Component {
	constructor(props) {
		super(props);
		this.showKeyboard = false;
		this.answerLetterMark = 0;
		this.answerInput = "";
		this.answerBottomLine = "";
		this.countDown = this.props.word.length;
		this.clickOnTestWordImg = this.clickOnTestWordImg.bind(this);
		this.clickOnLetterOfTestKeyword = this.clickOnLetterOfTestKeyword.bind(
			this
		);
	}

	componentDidMount() {}
	clickOnLetterOfTestKeyword(target) {
		console.log("clicke on ", target);
		// judge intput if correct , right show it in green , wrong show it in red
		// this.answer += target.innerHTML;
		let answerLetter = target.innerHTML;

		if (answerLetter === this.props.word[this.answerLetterMark]) {
			// if current letter is correct
			// remove a '_'
			this.answerBottomLine = this.answerBottomLine.slice(0, -1);
			// add correct letter
			this.answerInput += answerLetter;
			// compare answer to word
			this.answer = this.answerInput + this.answerBottomLine;
			if (this.answer === this.props.word) {
				console.log("answer corrent , need show next options page");
				Store.dispatch({ type: Config.ShowOptionsDiv });
			} else {
				// not finish yet ,netx letter
				this.answerLetterMark += 1;
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
			rate: 0.7
		});
		if (this.countDown !== 0) {
			this.countDown -= 1;
			// just update this page
			this.forceUpdate();
		}
		if (this.countDown === 0) {
			console.log("need show keyboard");
			this.showKeyboard = true;
			for (var i = this.props.word.length - 1; i >= 0; i--) {
				this.answerBottomLine += "_";
				this.answer = this.answerInput + this.answerBottomLine;
			}
			this.forceUpdate();
		}
	}
	render() {
		// return <p>Testing</p>;
		if (!this.showKeyboard) {
			return (
				<div className="testDiv">
					<div className="testWordDiv">
						<p>{this.props.word}</p>
					</div>
					<div className="testCountDownDiv">
						<p id="countDownP">{this.countDown}</p>
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
			return (
				<div className="testDiv">
					<div className="testAnswerDiv">
						<p className="testAnswerP">{this.answer}</p>
					</div>
					<div className="testKeyboard">
						<div className="testKeyboardRow">
							<p
								className="letterOfTestKeyboard"
								onClick={e =>
									this.clickOnLetterOfTestKeyword(e.target)}
							>
								q
							</p>
							<p
								className="letterOfTestKeyboard"
								onClick={e =>
									this.clickOnLetterOfTestKeyword(e.target)}
							>
								w
							</p>
							<p
								className="letterOfTestKeyboard"
								onClick={e =>
									this.clickOnLetterOfTestKeyword(e.target)}
							>
								e
							</p>
							<p
								className="letterOfTestKeyboard"
								onClick={e =>
									this.clickOnLetterOfTestKeyword(e.target)}
							>
								r
							</p>
							<p
								className="letterOfTestKeyboard"
								onClick={e =>
									this.clickOnLetterOfTestKeyword(e.target)}
							>
								t
							</p>

							<p
								className="letterOfTestKeyboard"
								onClick={e =>
									this.clickOnLetterOfTestKeyword(e.target)}
							>
								y
							</p>
							<p
								className="letterOfTestKeyboard"
								onClick={e =>
									this.clickOnLetterOfTestKeyword(e.target)}
							>
								u
							</p>
							<p
								className="letterOfTestKeyboard"
								onClick={e =>
									this.clickOnLetterOfTestKeyword(e.target)}
							>
								i
							</p>
							<p
								className="letterOfTestKeyboard"
								onClick={e =>
									this.clickOnLetterOfTestKeyword(e.target)}
							>
								o
							</p>
							<p
								className="letterOfTestKeyboard"
								onClick={e =>
									this.clickOnLetterOfTestKeyword(e.target)}
							>
								p
							</p>
						</div>
						<div className="testKeyboardRow">
							<p
								className="letterOfTestKeyboard"
								onClick={e =>
									this.clickOnLetterOfTestKeyword(e.target)}
							>
								a
							</p>
							<p
								className="letterOfTestKeyboard"
								onClick={e =>
									this.clickOnLetterOfTestKeyword(e.target)}
							>
								s
							</p>
							<p
								className="letterOfTestKeyboard"
								onClick={e =>
									this.clickOnLetterOfTestKeyword(e.target)}
							>
								d
							</p>
							<p
								className="letterOfTestKeyboard"
								onClick={e =>
									this.clickOnLetterOfTestKeyword(e.target)}
							>
								f
							</p>
							<p
								className="letterOfTestKeyboard"
								onClick={e =>
									this.clickOnLetterOfTestKeyword(e.target)}
							>
								g
							</p>
							<p
								className="letterOfTestKeyboard"
								onClick={e =>
									this.clickOnLetterOfTestKeyword(e.target)}
							>
								h
							</p>
							<p
								className="letterOfTestKeyboard"
								onClick={e =>
									this.clickOnLetterOfTestKeyword(e.target)}
							>
								j
							</p>
							<p
								className="letterOfTestKeyboard"
								onClick={e =>
									this.clickOnLetterOfTestKeyword(e.target)}
							>
								k
							</p>
							<p
								className="letterOfTestKeyboard"
								onClick={e =>
									this.clickOnLetterOfTestKeyword(e.target)}
							>
								l
							</p>
						</div>
						<div className="testKeyboardRow">
							<p
								className="letterOfTestKeyboard"
								onClick={e =>
									this.clickOnLetterOfTestKeyword(e.target)}
							>
								z
							</p>
							<p
								className="letterOfTestKeyboard"
								onClick={e =>
									this.clickOnLetterOfTestKeyword(e.target)}
							>
								x
							</p>
							<p
								className="letterOfTestKeyboard"
								onClick={e =>
									this.clickOnLetterOfTestKeyword(e.target)}
							>
								c
							</p>
							<p
								className="letterOfTestKeyboard"
								onClick={e =>
									this.clickOnLetterOfTestKeyword(e.target)}
							>
								v
							</p>
							<p
								className="letterOfTestKeyboard"
								onClick={e =>
									this.clickOnLetterOfTestKeyword(e.target)}
							>
								b
							</p>
							<p
								className="letterOfTestKeyboard"
								onClick={e =>
									this.clickOnLetterOfTestKeyword(e.target)}
							>
								n
							</p>
							<p
								className="letterOfTestKeyboard"
								onClick={e =>
									this.clickOnLetterOfTestKeyword(e.target)}
							>
								m
							</p>
						</div>
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
