import React from "react";
import { connect } from "react-redux";

class Info extends React.Component {
	constructor(props) {
		super(props);
		this.number = this.props.number;
	}
	componentDidMount() {
		// this.props.Info();
	}
	render() {
		if (this.props.number > 0) {
			return (
				<div className="infoDiv">
					<p>{this.props.number}</p>
				</div>
			);
		}
	}
}

const mapStateToProps = state => {
	return {
		number: state.reConnectCountDown
	};
};

const mapDispatchToProps = dispatch => {
	return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(Info);
