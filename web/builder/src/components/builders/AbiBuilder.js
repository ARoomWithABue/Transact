import React, { Component } from "react";
import {Serialize} from "eosjs";

class AbiBuilder extends Component {
    constructor(props) {
        super(props);

        this.onAbiChange = this.onAbiChange.bind(this);
    }

    componentWillMount() {

    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    async onAbiChange(arg) {
      let reader = new FileReader();
      reader.onload = () => {
        let data = reader.result;
        let abi = JSON.parse(data);
        const buffer = new Serialize.SerialBuffer({
          textEncoder: this.state.api.textEncoder,
          textDecoder: this.state.api.textDecoder,
        });

        let abiDefinition = this.state.api.abiTypes.get('abi_def');
        abi = abiDefinition.fields.reduce(
            (acc, {name: fieldName}) => Object.assign(acc, {[fieldName]: acc[fieldName] || []}),
            abi
        );
        abiDefinition.serialize(buffer, abi);

        let actions = [
          this.state.sb.makeAction("eosio", "setabi",
              {
                account: "eosio.trail",
                abi: Buffer.from(buffer.asUint8Array()).toString(`hex`)
              }, {actor: "eosio.trail", permission: "active"}),
          ...this.state.actions
        ];
        this.setState({ actions: actions });
      };

      if (arg.target.files.length > 0) {
        reader.readAsText(arg.target.files[0]);
      }
    }

    render() {
        return (
            <h1>Abi Builder</h1>
        );
    }
}

export default AbiBuilder;