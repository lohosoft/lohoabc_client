import React from "react";
import { connect } from "react-redux";
import WordsRecords from "./WordsRecords.js";

class Report extends React.Component {
    constructor(props) {
        super(props);
        this.wordsRecords = this.props.wordsRecords;
    }
    componentDidMount() {
        // this.props.Report();
    }

    render() {
        if (this.wordsRecords.length === 0) {
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
