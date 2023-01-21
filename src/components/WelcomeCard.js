import React from 'react';
import {Card, Button, Table, Image } from 'react-bootstrap'

import welcome_logo from '../assets/welcome-logo.jpg';

export default function WelcomeCard(props) {

    return (
        <div className="App">
            <Card>
                <Card.Body>
                    <h2>Welcome to this ReactJS/<a href="https://aladin.u-strasbg.fr/aladin.gml#AladinLite">AladinLight</a> demo app.</h2>
                    <Table>
                        <img src={welcome_logo} />

                    </Table>

                    <Card.Text>
                        <li><b>HiPS</b>: Select both local Catalogs and Surveys</li>
                        <li><b>UCAC4</b>: Show as many points as you want from a 114M star database</li>

                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    );

}

