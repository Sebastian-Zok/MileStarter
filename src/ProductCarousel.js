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
                <Carousel>
                    <Carousel.Item>
                        <img
                            className="d-block img-fluid"
                            src={diver}
                        />
                        <Carousel.Caption>
                            <h3>SNORXLE</h3>
                            <p>Lets you breeth under water!</p>
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
                            <h3>Backed by a real serious scientists</h3>
                            <p>
                                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor.
                            </p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
                <br />
                <h1>Experience SNORXEL©</h1>
                <p>Looking to explore the depths of the ocean without feeling like a fish out of water? Look no further than SNORXEL, the underwater breath mask that'll have you swimming like a pro in no time!
                    <br /><br />
                    With SNORXEL, you'll be able to breathe easy and explore the underwater world without worrying about pesky things like, you know, drowning. Say goodbye to bulky tanks and hello to sleek, stylish design that'll have all the other fishies jealous.
                    <br /><br />
                    And don't worry about looking like a dork in front of your scuba diving buddies – SNORXEL is the coolest kid on the block. With its bold colors and cutting-edge technology, you'll be the envy of the underwater community.
                    <br /><br />
                    So what are you waiting for? Dive into adventure with SNORXEL today!</p>
                <Accordion defaultActiveKey="0">
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Roadmap #1</Accordion.Header>
                        <Accordion.Body>
                            First of all we want to raise 50 ETH in order to make SNORXEL successfull. If we managed to raise the requried 50 ETH we will get 50% transfered to our wallet. But after the fundraise this project isn't over!
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>Roadmap #2</Accordion.Header>
                        <Accordion.Body>
                            We continue to provide you with updates on our development and start to deliver our first protoypes to customers. If you are unhappy with the development you have one year to use your DAO-Token to vote for a veto. If 50% of the pledgers decide to veto, you will get 0.5 ETH refunded and will not receive your SNORXEL. You may also endanger the others who have not decided to veto to get their SNORXEL. So decide wisely!
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
                <br />
            </div >
        );
    }
}

export default ProductCarousel;