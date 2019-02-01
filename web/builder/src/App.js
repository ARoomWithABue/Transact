import {TextEncoder, TextDecoder} from "text-encoding";
import {Api, JsonRpc} from "eosjs";
import React, { Component } from "react";

import "./styles/App.css";
import ScatterBridge  from "./helpers/scatterBridge";
import MsigHelper from "./helpers/msig";

import networks from "./configs/networks";

import BuilderSelector from "./components/BuilderSelector";
import ActionBuilder from "./components/ActionBuilder";
import TransactionViewer from "./components/TransactionViewer";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sb: null,
      api: null,
      builder: "",
      actions: [],
      trx: {},
      currentNetwork: networks[0]
    };
    this.toRender = this.toRender.bind(this);
  }

  async componentWillMount() {
    let network = this.state.currentNetwork;
    const rpc = new JsonRpc(`${network.protocol}://${network.host}:${network.port}`);
    this.setState({
      sb: new ScatterBridge(this.state.currentNetwork, "MsigHelper"),
      api: new Api({ rpc, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() })
    });
  }

  async componentDidMount() {
    await this.state.sb.connect();
    await this.state.sb.getIdentity();
    this.setState({ helper: new MsigHelper(this.state.sb) });
  }

  async actionHandler(action) {
    let actions = this.state.actions;
    actions.push(action);
    this.setState({ actions: actions });
  }

  async toRender(componentName) {
    this.setState({builder: componentName});
  }

  render() {
    return (
      <div className="App flex flex-row">
        <BuilderSelector handler={this.toRender}/>
        <ActionBuilder tag={this.state.builder} api={this.state.api}/>
        <TransactionViewer trx={this.state.trx}/>
      </div>
    );
  }
}

export default App;
