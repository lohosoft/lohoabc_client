import React from "react";
import { connect } from "react-redux";
class WordRecords extends React.Component {
	constructor(props) {
		super(props);
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
		// console.log(this.records);
	}
	componentDidMount() {
		// this.props.WordRecords();
	}
	render() {
		return (
			<div className="wordRecordsDiv">
				{this.word.map((letter, i) => {
					if (letter === " ") {
						return " ";
					} else {
						if (this.records[i] === 0) {
							return (
								<span key={i} className="greenLetter">
									{letter}
								</span>
							);
						} else if (this.records[i] === 1) {
							return (
								<span key={i} className="blueLetter">
									{letter}
								</span>
							);
						} else if (this.records[i] === 2) {
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
