import React, { Component } from 'react'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ProgressBar from 'react-bootstrap/ProgressBar';


class VetoSection extends Component {

    constructor(props) {
        super(props)
        this.state = {
            totalBackers: [],
            vetoBackers: [],
            isVeto: false
        }
    }

    componentWillMount() {
        this.getVeto(this.props.contract)
        this.getVetoBackers(this.props.contract)
        this.getTotalBackers(this.props.contract)
    }

    async getVetoBackers(contract) {
        await contract.methods.getVetoBackers().call()
            .then((res) => this.setState({ vetoBackers: res }));
    }

    async getVeto(contract) {
        await contract.methods.getIsVeto().call()
            .then((res) => this.setState({ isVeto: res }));
        console.log(this.state.isVeto);
    }

    async getTotalBackers(contract) {
        await contract.methods.getBackers().call()
            .then((res) => this.setState({ totalBackers: res }));
    }


    isVetoBacker() {
        return this.state.vetoBackers.find(element => element === this.props.account) != undefined ? true : false;
    }


    async veto(contract, account) {
        try {
            await contract.methods.veto().send({ from: account })
            alert('success')
        } catch (e) {
            if (e.code === 4001) {
                alert("User denied transaction")
            } else {
                alert("Error " + this.getErrorMessage(JSON.stringify(e)))
            }
        }
    }

    render() {
        return (
            <div>
                {this.state.isVeto ?
                    <><br /><h3>Veto Count</h3><ProgressBar variant="danger" now={this.state.totalBackers.length / this.state.vetoBackers.length} /><br /><Card>
                        <Card.Body>
                            <Card.Title>DAO-Refund</Card.Title>
                            <Card.Text>
                                If 50% of the pledgers decide to veto, you will get 0.5 ETH back.                                </Card.Text>
                            <Button variant="danger" onClick={() => this.veto(this.props.contract, this.props.account)} disabled={this.isVetoBacker()}>VETO</Button>
                        </Card.Body>
                    </Card></> : <div></div>}
            </div >
        );
    }
}

export default VetoSection;