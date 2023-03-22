import React, { Component } from 'react'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ProgressBar from 'react-bootstrap/ProgressBar';


class PledgeOptions extends Component {

    constructor(props) {
        super(props)
     }

    render() {
        return (
            <div>
                <h3>Raised Amount</h3>
                <ProgressBar now={60}  />
                <br/>
                <Row>
                    <Col>
                        <Card  >
                            <Card.Body>
                                <Card.Title>Early Bird Special</Card.Title>
                                <Card.Text>
                                    The first ten pledgers get their SNORXEL for a reduced price of only 1 ETH
                                </Card.Text>
                                <Button variant="primary">PLEDGE</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card  >
                            <Card.Body>
                                <Card.Title>Founders Edition</Card.Title>
                                <Card.Text>
                                    Get your own SNORXEL in the limited founders edition for only 1.5 ETH  </Card.Text>
                                <Button variant="primary">PLEDGE</Button>
                            </Card.Body>
                        </Card></Col>
                </Row>
            </div >
        );
    }
}

export default PledgeOptions;