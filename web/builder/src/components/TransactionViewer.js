import React, { Component } from "react";
import ReactJson from "react-json-view";

class TransactionViewer extends Component {
    constructor(props) {
        super(props);
        this.onClickHandler = this.onClickHandler.bind(this);
    }

    componentWillMount() {

    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    async onClickHandler(event) {
        this.props.handler(event.target.value);
    }

    render() {
        let style = {
            float: "left"
        }

        return (
            <div id="TransactionViewer" className="tertiaryColor">
                <ReactJson style={style}></ReactJson>
            </div>
        );
    }
}

export default TransactionViewer;