import React from "react";
import { connect } from "react-redux";
import Hello from "./Hello.js";
import Report from "./Report.js";

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
		if (this.props.reporting) {
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
						<Report />
					</div>
				);
			} else {
				return <Report />;
			}
		}
	}
}

const mapStateToProps = state => {
	return {
		reConnectCountDown: state.reConnectCountDown,
		fetching: state.fetching,
		reporting: state.reporting
	};
};

const mapDispatchToProps = dispatch => {
	return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
