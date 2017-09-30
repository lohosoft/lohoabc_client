import React from "react";
import { connect } from "react-redux";
import WordsRecords from "./WordsRecords.js";

class Report extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        // this.props.Report();
    }

    render() {
        if (this.wordsRecords === []) {
            return <div>您当前没有学习记录。</div>;
        } else {
            return <WordsRecords />;
        }
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
export default connect(mapStateToProps, mapDispatchToProps)(Report);
