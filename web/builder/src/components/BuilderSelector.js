import React, { Component } from "react";
import builders from "./builders";

class BuilderSelector extends Component {
    constructor(props) {
        super(props);
        this.onClickHandler = this.onClickHandler.bind(this);
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if(nextProps.actionName !== this.props.actionName) {
            console.log(`will it update? nextActionName: ${nextProps.actionName}, currentActionName: ${this.prop.actionName}`);
            this.renderInputs(this.props.actionName, []);
        }
    }

    componentWillMount() {

    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    renderSelectors() {
        return Object.keys(builders).map((key) => {
            let current = builders[key];
            return <button key={key} onClick={this.onClickHandler} value={key}>{current.displayName}</button>
        });
    }

    async onClickHandler(event) {
        this.props.handler(event.target.value);
    }

    render() {
        return (
            <div id="ActionSelector" className="flex flex-col primaryColor shadow">
                {  this.renderSelectors() }
            </div>
        );
    }
}

export default BuilderSelector;