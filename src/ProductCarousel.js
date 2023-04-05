import React, { Component } from 'react'
import Carousel from 'react-bootstrap/Carousel';

import Accordion from 'react-bootstrap/Accordion';

import turtle from './assets/turtle.jpg';
import diver from './assets/diver.jpg';
import scientist from './assets/scientist.jpg';

class ProductCarousel extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <br />
                <Carousel>
                    <Carousel.Item>
                        <img
                            className="d-block img-fluid"
                            src={diver}
                        />
                        <Carousel.Caption>
                            <h3>SNORXLE</h3>
                            <p>Breeth under water!</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={turtle}
                        />
                        <Carousel.Caption>
                            <h3>Inspiring Quote</h3>
                            <p>Experience total freedom</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={scientist}
                        />
                        <Carousel.Caption>
                            <h3>Backed by a real scientists</h3>

                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
                <br />
                <h1>Experience SNORXEL©</h1>
                <p>Looking to explore the depths of the ocean without feeling like a fish out of water? Look no further than SNORXEL, the worlds first underwater breath mask!
                    <br /><br />
                    With SNORXEL, you'll be able to breathe easy and explore the underwater world without worrying about pesky things like, you know, drowning...
                    <br /><br />
                    Say goodbye to bulky tanks and hello to sleek, stylish design that'll make you be the envy of the underwater community.
                    <br /><br />
                    So what are you waiting for? Dive into the adventure with SNORXEL today!</p>
                <Accordion defaultActiveKey="0">
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Roadmap #1</Accordion.Header>
                        <Accordion.Body>
                            We want to raise 3 ETH in order to make SNORXEL successful. If we managed to raise the requried ETH we will get 50% transfered to our wallet.
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>Roadmap #2</Accordion.Header>
                        <Accordion.Body>
                            After the fundraise we continue to provide you with updates on our development and start to deliver first protoypes to customers. If you are unhappy you have one year to use your DAO-Token to vote for a veto. If 50% of the pledgers decide to veto, you will get 0.5 ETH refunded and will not receive anything. You may also endanger that others who have not decided to veto, to get their SNORXEL. So decide wisely!
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
                <br />
            </div >
        );
    }
}

export default ProductCarousel;