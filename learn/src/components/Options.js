import React from "react";
import { connect } from "react-redux";
import Store from "../libs/store.js";
import Config from "../libs/config.js";
import Utils from "../libs/utils.js";

class Options extends React.Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {}
	reloadOptions() {
		Store.dispatch({ type: Config.ReloadOptions });
	}
	render() {
		// return <p onClick={e => this.props.getClick(e.target)}> Options </p>;

		let imgsHtml = this.props.options.map(option => {
			return (
				<img
					className="optionImg"
					id={Utils.wordToUrl(option.word)}
					key={Utils.wordToUrl(option.word)}
					name={option.trans}
					src={option.url}
					onClick={e => this.props.getClick(e.target)}
				/>
			);
		});

		return (
			<div className="optionDiv">
				<div className="optionImgsDiv">{imgsHtml}</div>
				<div>
					<p
						onClick={e => this.reloadOptions()}
						className="reloadOptionsBtnP"
					>
						换一换
					</p>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		options: state.optionsData
	};
};

const mapDispatchToProps = dispatch => {
	return {
		getClick: target =>
			dispatch({
				type: Config.ClickOnOptionImg,
				payload: {
					word: target.id,
					url: target.src,
					trans: target.name
				}
			})
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(Options);
