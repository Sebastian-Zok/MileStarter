import React, { Component } from 'react'
import Form from 'react-bootstrap/Form';
import web3 from 'web3';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';

class AdminSection extends Component {

    constructor(props) {
        super(props)
        this.state = {
            goal: '',
            raised: '',
            backers: [],
            vetoBackers: [],
            isVeto: false
        }
    }

    componentWillMount() {
        this.getRaised(this.props.contract)
        this.getBackers(this.props.contract)
        this.getVeto(this.props.contract)
        this.getVetoBackers(this.props.contract)

    }

    async launchCampaign(contract, goal) {
        await contract.methods.launchCampaign(web3.utils.toWei(goal, "ether")).send({ from: this.props.account })
            .then(console.log);
        window.location.reload(false);
    }

    async getRaised(contract) {
        await contract.methods.getPledged().call()
            .then((res) => this.setState({ raised: res }));
    }

    async getBackers(contract) {
        contract.methods.getBackers().call().then(
            (backers) => {
                contract.methods.getEarlyBirdBackers().call().then((earlyBirdBackers) =>
                    this.setState({ backers: backers.concat(earlyBirdBackers) })
                )
            }
        )
    }

    async getVetoBackers(contract) {
        await contract.methods.getVetoBackers().call()
            .then((res) => this.setState({ vetoBackers: res }));
    }

    async getVeto(contract) {
        await contract.methods.getIsVeto().call()
            .then((res) => this.setState({ isVeto: res }));
    }

    async cancelCampaign(contract) {
        await contract.methods.cancelCampaign().send({ from: this.props.account })
            .then(console.log);
        window.location.reload(false);
    }

    render() {

        let endDate = new Date(Number(this.props.campaign[2]) * 1000)
        let todayDate = new Date()
        let timeLeft = new Date(endDate.getTime() - todayDate.getTime());
        if (timeLeft > 0) {
            timeLeft = Math.ceil(timeLeft / (1000 * 3600 * 24))
        } else {
            timeLeft = 'Fundraise Over'
        }
        endDate = endDate.getHours() + ":" + endDate.getMinutes() + ", " + endDate.toDateString();
        todayDate = todayDate.getHours() + ":" + todayDate.getMinutes() + ", " + todayDate.toDateString();

        return (
            <div>
                <br />
                <h1>Admin Section</h1>
                {this.props.campaign[0] === "0x0000000000000000000000000000000000000000" ?
                    <Form >
                        <Form.Group className="mb-3" controlId="goal">
                            <Form.Label>Set Goal</Form.Label>
                            <Form.Control type="number" value={this.state.goal} onChange={e => this.setState({ goal: e.target.value })} placeholder='In ETH' />
                        </Form.Group>
                        <Button variant="primary" onClick={() => this.launchCampaign(this.props.contract, this.state.goal)}>
                            Launch Project
                        </Button>
                    </Form>
                    :
                    <Form >
                        <Form.Group className="mb-3" controlId="goal">
                            <Form.Label><b>Creator: </b>{this.props.campaign[0]} </Form.Label><br />
                            <Form.Label><b>Goal: </b> {this.props.campaign[1]} Wei </Form.Label><br />
                            <Form.Label><b>Raised: </b> {this.state.raised} Wei </Form.Label><br />
                            <Form.Label><b>Percentage of Goal: </b> {(100 * this.state.raised) / this.props.campaign[1]}% </Form.Label><br />


                            <Form.Label><b>Today: </b> {todayDate}</Form.Label><br />
                            <Form.Label><b>End Date: </b> {endDate}</Form.Label><br />
                            <Form.Label><b>Days Left: </b> {timeLeft}</Form.Label><br />
                            <Form.Label><b>Backers:</b> </Form.Label>
                            <ListGroup as="ul">
                                {this.state.backers.map((add) => <ListGroup.Item>{add} </ListGroup.Item>)}
                            </ListGroup>
                        </Form.Group>

                        {this.state.isVeto ? <><Form.Label><b>Veto Backers:</b> </Form.Label><ListGroup as="ul">
                            {this.state.vetoBackers.map((add) => <ListGroup.Item>{add} </ListGroup.Item>)}
                        </ListGroup></>
                            : <div></div>}

                        <Button variant="primary" onClick={() => this.claimAfterVeto(this.props.contract)} >Claim After Veto Time is Over</Button>
                        <br></br>                        <br></br>

                        <Button variant="danger" onClick={() => this.cancelCampaign(this.props.contract)} >Cancel Project</Button>
                    </Form>
                }
            </div>
        );
    }
}

export default AdminSection; 