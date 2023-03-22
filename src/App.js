import React, { Component } from 'react'
import Web3 from 'web3'
import './App.css'

class App extends Component {
  componentWillMount() {
    this.loadBlockchainData()
  }
  
    constructor(props) {
      super(props)
      this.state = { account: '' }
    }

  async loadBlockchainData() {
    const web3 = new Web3(Web3.givenProvider)
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
  }

  async connect() {
    if (window.ethereum) {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      window.web3 = new Web3(window.ethereum);
    } else {
      console.log("No wallet");
    }
  }


  render() {
    return (
      <div className="container">
        <p>Your address: {this.state.account}</p>
        <button onClick={this.connect}>Connect</button>
      </div>
    );
  }
}

export default App;