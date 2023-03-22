import React, { Component } from 'react'
import Web3 from 'web3'
import './global.css'
import Header from './Header'

class App extends Component {
  componentWillMount() {
    this.loadBlockchainData()
  }

  constructor(props) {
    super(props)
    this.setStateOfAccounts = this.setStateOfAccounts.bind(this);
    this.state = { account: '' }
  }

  async loadBlockchainData() {
    const web3 = new Web3(Web3.givenProvider)
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
  }

  setStateOfAccounts = (account) => {
    this.setState({ account });
  }
  

  render() {
    return (
      <div>
        <Header setStateOfAccounts={this.setStateOfAccounts}></Header>
        <div className="container">
          <p>Your address: {this.state.account}</p>
        </div>
      </div>
    );
  }
}

export default App;