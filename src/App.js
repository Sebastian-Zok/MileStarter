import React, { Component } from 'react'
import Web3 from 'web3'
import Header from './Header'
import ProductCarousel from './ProductCarousel'
import PledgeOptions from './PledgeOptions'
import VetoSection from './VetoSection'
import AdminSection from './AdminSection'
const { abi } = require('./MileStarter.json')

class App extends Component {

  contractAddress = '0xD35270E931E7B0877A340f1F2689e8aAdc9f4f33';

  componentWillMount() {
    this.loadBlockchainData()
  }

  constructor(props) {
    super(props)
    this.setStateOfAccount = this.setStateOfAccount.bind(this);
    this.state = {
      account: '',
      web3: {},
      abi: {},
      contract: {},
      campaign: {}
    }
  }

  async loadBlockchainData() {
    const web3 = new Web3(Web3.givenProvider)
    const contract = new web3.eth.Contract(abi, this.contractAddress)
    const accounts = await web3.eth.getAccounts()
    const campaign = await contract.methods.getCampaign().call()
    this.setState({ account: accounts[0], web3, contract, campaign })
  }

  async connectToContract() {
    const web3 = new Web3(Web3.givenProvider)
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
  }

  setStateOfAccount = (account) => {
    this.setState({ account });
  }


  render() {
    console.log(this.state.campaign[0]);
    if (this.state.campaign[0] === this.state.account || this.state.campaign[0] === "0x0000000000000000000000000000000000000000") {
      return (
        <div>
          <Header setStateOfAccount={this.setStateOfAccount} account={this.state.account}></Header>
          <div className="container">
            <AdminSection account={this.state.account} campaign={this.state.campaign} contract={this.state.contract}></AdminSection>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <Header setStateOfAccount={this.setStateOfAccount} account={this.state.account}></Header>
          <div className="container">
            <ProductCarousel></ProductCarousel>
            <PledgeOptions account={this.state.account} contract={this.state.contract} campaign={this.state.campaign}></PledgeOptions>
            <VetoSection></VetoSection>
            <br />
          </div>
        </div>
      );
    }
  }
}

export default App;