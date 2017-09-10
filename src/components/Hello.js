import React from "react";
import { connect } from "react-redux";

class Hello extends React.Component {
	componentDidMount() {
		// this.props.hello();
	}
	render() {
		return (
			<div className="qrcodeDiv">
				<img src="./qrcode_for_lohoabc_ip.png" />
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {};
};

const mapDispatchToProps = dispatch => {
	return {
		getClick: target =>
			dispatch({
				type: "ClickONHello",
				payload: target
			})
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(Hello);
