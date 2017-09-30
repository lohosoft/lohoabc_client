import React from "react";
import { connect } from "react-redux";

class Hello extends React.Component {
    componentDidMount() {
        // this.props.hello();
    }
    render() {
        return (
            <div className="helloDiv">
                <p>正在载入...</p>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {};
};

const mapDispatchToProps = dispatch => {
    return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(Hello);
