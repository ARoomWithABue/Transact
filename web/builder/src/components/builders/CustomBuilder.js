import React, { Component } from "react";
import {FormGroup, FormControl, ControlLabel} from "react-bootstrap";

import {Serialize} from "eosjs";

import ActionForm from "../form/ActionForm";
import cTypes from "../form/contractTypes";

class CustomBuilder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contractName: null,
            abi: null
        };

        this.onContractSelect = this.onContractSelect.bind(this);
        this.onContractChange = this.onContractChange.bind(this);
        this.inputHandler = this.inputHandler.bind(this);
        this.onSubmitAction = this.onSubmitAction.bind(this);
        this.onActionSelect = this.onActionSelect.bind(this);
    }

    componentWillMount() {

    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    async onContractChange(event) {
        this.setState({contractName: event.target.value});
    }

    async onContractSelect(event) {
        event.preventDefault();
        if (this.state.contractName && this.state.contractName !== "") {
            let result = await this.props.api.getAbi(this.state.contractName);
            console.log(result);
            this.setState({abi: result});
        }
    }

    async onActionSelect(event) {
        let inputs = this.renderInputs(event.target.value, []);
        this.setState({formInputs: inputs});
    }

    async inputHandler(event) {
        let stateObject = function() {
            let returnObj = {};
            returnObj[event.target.name] = event.target.value;
            return returnObj;
        }.bind(event)();

        this.setState( stateObject );
    }

    async onSubmitAction(event) {
        event.preventDefault();
    }

    getStructByName(name, structs) {
        for(let i = 0; i < structs.length; i++) {
            let struct = structs[i];
            if(struct.name === name) {
                // console.log(`name: ${name} found at i: ${i}`);
                return struct;
            }
        }
    }

    renderInputs(type, inputs) {
        if(this.state.abi) {
            // console.log(`renderInputs(${type})`);
            let abi = this.state.abi;
            let struct = this.getStructByName(type, abi.structs);

            struct.fields.forEach((field) => {
                if(this.isBasic(field.type)) {
                    // console.log(`basic type: ${field.type}`);
                    inputs.push({name: field.name, types: [field.type]});
                } else {
                    // console.log(`non-basic type: ${field.type}`);
                    inputs.push({
                        name: field.name,
                        types: [...this.renderInputs(field.type, [])]
                    });
                }
            });
            return inputs;
        }
    }

    isBasic(type) {
        // console.log(`isBasic(${type}): ${cTypes.includes(type)}`);
        return cTypes.includes(type);
    }

    renderActionSelect() {
        if (this.state.abi) {
            return (
                <FormControl componentClass="select" className="form-control mr-sm-2"
                             placeholder="Select Action"
                             name="actionName"
                             onChange={this.onActionSelect}>
                    <option value="">Select Action</option>
                    {
                        this.state.abi.actions.map((action) => {
                            return <option key={action.name}
                                           value={action.name}>{action.name}</option>
                        })
                    }
                </FormControl>
            );
        }
    }

    renderNav() {
        let formStyle = {
            width: "100%"
        }
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="">
                        <form onSubmit={this.onContractSelect} className="form-inline" style={formStyle}>
                            <input onChange={this.onContractChange} className="form-control"
                                   type="search"
                                   placeholder="Contract Name"
                                   aria-label="Search"/>
                            <button className="btn btn-primary" type="submit">Search</button>
                            {this.renderActionSelect()}
                        </form>
                    </div>
                </nav>
            </div>
        );
    }

    render() {
        return (
            <div>
                {this.renderNav()}
                <div className="container">
                    <ActionForm formInputs={this.state.formInputs}></ActionForm>
                </div>
            </div>
        );
    }
}

export default CustomBuilder;