import React, { Component } from "react";

class CodeBuilder extends Component {
    constructor(props) {
        super(props);
        this.onWasmChange = this.onWasmChange.bind(this);
    }

    componentWillMount() {

    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    async onWasmChange(arg) {
      let reader = new FileReader();
      reader.onload = () => {
        let data = reader.result;
        let actions = [
            this.state.sb.makeAction("eosio", "setcode",
            {
              account: "eosio.trail",
              vmtype: 0,
              vmversion: 0,
              code: this.buf2hex(new Int8Array(data))
            }, {actor: "eosio.trail", permission: "active"}),
            ...this.state.actions
        ];

        this.setState({ actions:  actions });
      };
      if(arg.target.files.length > 0) {
        reader.readAsArrayBuffer(arg.target.files[0]);
      }
    }

    buf2hex(buffer) { // buffer is an ArrayBuffer
      return Array.prototype.map.call(new Uint8Array(buffer), x => ('00' + x.toString(16)).slice(-2)).join('');
    }


    render() {
        return (
            <h1>Code Builder</h1>
        );
    }
}

export default CodeBuilder;