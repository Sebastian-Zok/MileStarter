import React, { Component } from 'react'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ProgressBar from 'react-bootstrap/ProgressBar';


class VetoSection extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <br />
                <h3>Veto Count</h3>
                <ProgressBar variant="danger" now={60} />
                <br />
                <Card  >
                    <Card.Body>
                        <Card.Title>DAO-Refund</Card.Title>
                        <Card.Text>
                            If 50% of the pledgers decide to veto, you will get 0.5 ETH back.                                </Card.Text>
                        <Button variant="danger">VETO</Button>
                    </Card.Body>
                </Card>

            </div >
        );
    }
}

export default VetoSection;