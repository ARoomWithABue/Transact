import {FormGroup, FormControl, ControlLabel} from "react-bootstrap";
import React, { Component } from "react";

//TODO: map of jsx by type

class ActionForm extends Component {
    constructor(props) {
        super(props);
        this.inputHandler = this.inputHandler.bind(this);
    }

    componentWillMount() {
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    async inputHandler(event) {
        let stateObject = function() {
            let returnObj = {};
            returnObj[this.target.name] = this.target.value;
            return returnObj;
        }.bind(event)();

        this.setState( stateObject );
    }

    /*
    Types:
    * bool - checkbox
    * uints - text
    * ints - text
    * symbol - text (name) + text (precision)
    * symbol_code - text
    * asset - text (amount) + text (symbol_code) + text (precision)
    * hash - text
    * block_timestamp - text
    * name - text
    * struct - form subgroup
    */

    //1) text box for typing in contract name
    //2) validate name
    //3) get abi
    //4) generate drop with possible actions
    //5) generate form for actions based on action type

    render() {
        return (
            <div className="row top30">
                <div className="col-md-10 col-center card">
                    <form>
                        <h4 className="top10">ActionName</h4>
                        <FormGroup>
                            <ControlLabel>Asset Field 1</ControlLabel>
                            <div className="row">
                                <div className="col-md-6">
                                    <FormControl type="text" placeholder="Enter Amount" onChange={this.inputHandler}/>
                                </div>
                                <div className="col-md-6">
                                    <FormControl type="text" placeholder="Enter SYMBOL" onChange={this.inputHandler}/>
                                </div>
                            </div>
                        </FormGroup>
                    </form>
                </div>
            </div>
        );
    }
}

export default ActionForm;