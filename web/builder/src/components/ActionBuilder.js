import React, { Component } from "react";
import builders from "./builders";

class ActionBuilder extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {

    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    //TODO: iterate over possible builder properties, turn them into buttons

    render() {
        const TagName = builders[this.props.tag || "custom"].module;
        return (
            <div id="ActionBuilder" className="shadow">
                <TagName api={this.props.api}/>
            </div>
        );
    }
}

export default ActionBuilder;