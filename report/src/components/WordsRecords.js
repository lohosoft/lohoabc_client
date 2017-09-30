import React from "react";
import { connect } from "react-redux";
import WordRecords from "./WordRecords.js";
class WordsRecords extends React.Component {
    componentDidMount() {
        // this.props.WordsRecords();
    }
    render() {
        return <WordRecords />;
    }
}

const mapStateToProps = state => {
    return {};
};

const mapDispatchToProps = dispatch => {
    return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(WordsRecords);
