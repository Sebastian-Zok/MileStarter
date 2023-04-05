import React, { Component } from 'react'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ProgressBar from 'react-bootstrap/ProgressBar';
import web3 from 'web3';


class PledgeOptions extends Component {

    constructor(props) {
        super(props)
        this.state = {
            raised: '00',
            backers: []
        }

    }

    componentWillMount() {
        this.getRaised(this.props.contract)
        this.getBackers(this.props.contract)
    }

    async pledge(contract, account) {
        try {
            await contract.methods.pledge().send({ from: account, value: web3.utils.toWei("1.5", "ether") })
            alert('success')
        } catch (e) {
            if (e.code === 4001) {
                alert("User denied transaction")
            } else {
                alert("Error " + this.getErrorMessage(JSON.stringify(e)))
            }
        }
    }

    async pledgeEarlyBird(contract, account) {
        try {
            await contract.methods.pledgeEarlyBird().send({ from: account, value: web3.utils.toWei("1", "ether") })
                .then(console.log);
            alert('success')
        } catch (e) {
            if (e.code === 4001) {
                alert("User denied transaction")
            } else {
                alert("Error " + this.getErrorMessage(JSON.stringify(e)))
            }
        }
    }

    getErrorMessage(input) {
        return input.match(/(?<=revert )([^\\]+)/)[0]
    }

    async getRaised(contract) {
        await contract.methods.getPledged().call()
            .then((res) => this.setState({ raised: res }));
    }

    async getBackers(contract) {
        await contract.methods.getBackers().call().then(
            (backers) => {
                contract.methods.getEarlyBirdBackers().call().then((earlyBirdBackers) =>
                    this.setState({ backers: backers.concat(earlyBirdBackers) })
                )
            }
        )
    }

    isBacker() {
        return this.state.backers.find(element => element === this.props.account) != undefined ? true : false;
    }

    render() {

        let raisedAmount = 0
        let goal = 0

        try {
            raisedAmount = web3.utils.fromWei(this.state.raised, "ether")
            goal = web3.utils.fromWei(this.props.campaign[1], "ether")
        } catch (error) {

        }


        console.log(this.state.backers);
        return (
            <div>
                {<h3>Raised Amount: {/* {raisedAmount} of {goal} */} ETH</h3>}
                <ProgressBar now={(100 * this.state.raised) / this.props.campaign[1]} />
                <br />
                <Row>
                    <Col>
                        <Card  >
                            <Card.Body>
                                <Card.Title>Early Bird Special</Card.Title>
                                <Card.Text>
                                    The first ten pledgers get their SNORXEL for a reduced price of only 1 ETH
                                </Card.Text>
                                <Button variant="primary" onClick={() => this.pledgeEarlyBird(this.props.contract, this.props.account)} disabled={this.isBacker()}>PLEDGE</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card  >
                            <Card.Body>
                                <Card.Title>Founders Edition</Card.Title>
                                <Card.Text>
                                    Get your own SNORXEL in the limited founders edition for only 1.5 ETH  </Card.Text>
                                <Button variant="primary" onClick={() => this.pledge(this.props.contract, this.props.account)} disabled={this.isBacker()}>PLEDGE</Button>
                            </Card.Body>
                        </Card></Col>
                </Row>
            </div >
        );
    }
}

export default PledgeOptions;