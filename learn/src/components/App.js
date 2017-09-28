import React from "react";
import { connect } from "react-redux";
import Hello from "./Hello.js";
import Test from "./Test.js";
import Options from "./Options.js";

class App extends React.Component {
	componentDidMount() {}
	render() {
		if (this.props.fetching) {
			return <Hello />;
		}
		if (this.props.optioning) {
			return <Options />;
		}
		if (this.props.testing) {
			return <Test />;
		}
	}
}

const mapStateToProps = state => {
	return {
		fetching: state.fetching,
		optioning: state.optioning,
		testing: state.testing
	};
};

const mapDispatchToProps = dispatch => {
	return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
