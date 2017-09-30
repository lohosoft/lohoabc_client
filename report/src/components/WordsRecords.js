import React from "react";
import { connect } from "react-redux";
import WordRecords from "./WordRecords.js";
import createFragment from "react-addons-create-fragment";

class WordsRecords extends React.Component {
	constructor(props) {
		super(props);
		this.wordsRecords = [];
		this.props.wordsRecords.map(wordRecords => {
			this.wordsRecords.push(createFragment(wordRecords));
		});
		console.log(this.wordsRecords);
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
							word={wordRecords[4]}
							records={wordRecords[1]}
						/>
					);
				})}
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		wordsRecords: state.wordsRecords
	};
};

const mapDispatchToProps = dispatch => {
	return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(WordsRecords);
