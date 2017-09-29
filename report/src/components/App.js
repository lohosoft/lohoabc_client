import React from "react";
import { connect } from "react-redux";
import Hello from "./Hello.js";
import Test from "./Test.js";
import Options from "./Options.js";
import Info from "./Info.js";

class App extends React.Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {}
	render() {
		if (this.props.fetching) {
			if (this.props.reConnectCountDown > 0) {
				return (
					<div>
						<div className="infoDiv" id="infoDiv">
							<p>
								{"网络连接断开，" +
									this.props.reConnectCountDown +
									" 秒后尝试重新连接"}
							</p>
						</div>
						<Hello />
					</div>
				);
			} else {
				return <Hello />;
			}
		}
		if (this.props.optioning) {
			if (this.props.reConnectCountDown > 0) {
				return (
					<div>
						<div className="infoDiv" id="infoDiv">
							<p>
								{"网络连接断开，" +
									this.props.reConnectCountDown +
									" 秒后尝试重新连接"}
							</p>
						</div>
						<Options />
					</div>
				);
			} else {
				return <Options />;
			}
		}
		if (this.props.testing) {
			if (this.props.reConnectCountDown > 0) {
				return (
					<div>
						<div className="infoDiv" id="infoDiv">
							<p>
								{"网络连接断开，" +
									this.props.reConnectCountDown +
									" 秒后尝试重新连接"}
							</p>
						</div>
						<Test />
					</div>
				);
			} else {
				return <Test />;
			}
		}
	}
}

const mapStateToProps = state => {
	return {
		reConnectCountDown: state.reConnectCountDown,
		fetching: state.fetching,
		optioning: state.optioning,
		testing: state.testing
	};
};

const mapDispatchToProps = dispatch => {
	return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
