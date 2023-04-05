import React, { Component } from 'react'
import Web3 from 'web3'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import logo from './assets/Logo.png';
import Button from 'react-bootstrap/button';

class Header extends Component {

  constructor(props) {
    super(props)
    this.connect = this.connect.bind(this)
  }

  async connect() {
    if (window.ethereum) {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      window.web3 = new Web3(window.ethereum);
      const web3 = new Web3(Web3.givenProvider)
      const accounts = await web3.eth.getAccounts()
      this.props.setStateOfAccount(accounts[0])
      alert("Connected!\nPublic Key: " + accounts[0])
    } else {
      console.log("No wallet");
    }
  }


  render() {
    return (
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>
            <img
              alt="Logo"
              src={logo}
              width="39"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            MileStarter.eth
          </Navbar.Brand>
          <Button onClick={this.connect} className="d-flex" variant="outline-success">{this.props.account ? "Connected" : "Connect to Wallet"}</Button>
        </Container>
      </Navbar>
    );
  }
}

export default Header;