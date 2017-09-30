import React from "react";
import { connect } from "react-redux";
class WordRecords extends React.Component {
	componentDidMount() {
		// this.props.WordRecords();
	}
	render() {}
}

const mapStateToProps = state => {
	return {};
};

const mapDispatchToProps = dispatch => {
	return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(WordRecords);
