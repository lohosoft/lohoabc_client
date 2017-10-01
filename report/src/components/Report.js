import React from "react";
import { connect } from "react-redux";
import WordsRecords from "./WordsRecords.js";

class Report extends React.Component {
    constructor(props) {
        super(props);
        this.wordsRecords = this.props.wordsRecords;
        console.log("in report div with data : ", this.wordsRecords);
    }
    componentDidMount() {
        // this.props.Report();
    }

    render() {
        if (this.wordsRecords.length === 0) {
            return (
                <div className="noHistoryDiv">
                    <p>您当前没有学习记录。</p>
                </div>
            );
        } else {
            return <WordsRecords wordsRecords={this.wordsRecords} />;
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
