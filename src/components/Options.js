import React from "react";
import { connect } from "react-redux";
import Config from "../config.js";

class Options extends React.Component {
	componentDidMount() {}
	render() {
		// return <p onClick={e => this.props.getClick(e.target)}> Options </p>;

		let imgsHtml = this.props.imgs.map(img => {
			return (
				<img className="optionImg"
					id={img.index}
					key={img.index}
					name={img.word}
					src={img.url}
					onClick={e => this.props.getClick(e.target)}
				/>
			);
		});

		return <div className="optionDiv">{imgsHtml}</div>;
	}
}

const mapStateToProps = state => {
	return {
		imgs: state.optionsImgs
	};
};

const mapDispatchToProps = dispatch => {
	return {
		getClick: target =>
			dispatch({
				type: Config.ClickOnOptionImg,
				payload: target
			})
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(Options);
