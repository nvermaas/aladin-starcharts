import React from 'react';
import {Card, Button, Table, Image } from 'react-bootstrap'

import welcome_logo from '../assets/welcome-logo.jpg';

export default function WelcomeCard(props) {

    return (
        <div className="App">
            <Card>
                <Card.Body>
                    <h2>Starcharts!</h2>
                    <Table>
                        <img src={welcome_logo} />

                    </Table>

                    <Card.Text>
                        <li><b>UCAC4</b>: Magnitude 15 starchart based on 114M UCAC4 star database</li>
                        <li><b>surveys</b>: background surveys from CDS</li>
                        <li><b>transients</b>: Planets, asteroids and comets</li>
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    );

}

