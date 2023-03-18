import React from 'react';
import {Container, Card, Col, Row, Button, Table, Image } from 'react-bootstrap'

import { useGlobalReducer } from '../../contexts/GlobalContext';
import { toHMSLabel, toFOVLabel } from '../../utils/coordinates'
import MagnitudeBox from './MagnitudeBox'
import RefreshButton from "./RefreshButton";
import ResetButton from "./ResetButton";
import RABox from "./RABox";
import DECBox from "./DECBox";

import InlineCheckboxesLayers from "./InlineCheckboxesLayers";
import SelectLabelButton from "./SelectLabelButton";

export default function LeftPanel(props) {
    const [ my_state , my_dispatch] = useGlobalReducer()

    const renderRADec = (ra,dec) => {
        try {
            let ra_label = Number(ra).toFixed(2)
            let dec_label = Number(dec).toFixed(2)
            let radec_label = ra_label + ', ' + dec_label
            return <div>{(radec_label)} </div>
        } catch (e) {
            alert(e)
            return <div>n/a</div>
        }
    }

    return (
        <div className="App">
            <Card>

                <Card.Body align={"left"}>

                    <table>
                        <Row><Col sm={4} md={4} lg={4}>UCAC4 :</Col><Col sm={8} md={8} lg={8}> {my_state.number_of_stars}  {my_state.status_ucac4}</Col></Row>
                        <Row><Col sm={4} md={4} lg={4}>HygData :</Col><Col sm={8} md={8} lg={8}> {my_state.number_of_hygdata}  {my_state.status_hygdata}</Col></Row>

                        <hr></hr>
                        <Row>
                            <Col sm={3} md={3} lg={3}>Labels: </Col>
                            <Col sm={9} md={9} lg={9} ><SelectLabelButton /></Col>
                        </Row>
                        <Row>
                            <Col sm={3} md={3} lg={3}>Data: </Col>
                            <Col sm={9} md={9} lg={9}><InlineCheckboxesLayers /></Col>
                        </Row>
                        <hr></hr>
                        <Row>
                            <Col sm={4} md={4} lg={4}>RA : <RABox/></Col>
                            <Col sm={4} md={4} lg={4}>dec : <DECBox/></Col>
                            <Col sm={4} md={4} lg={4}>Mag Limit: <MagnitudeBox/></Col>
                        </Row>
                        <hr></hr>
                        <Row>
                            <Col><ResetButton /></Col>
                            <Col><RefreshButton /></Col>
                        </Row>

                    </table>
                </Card.Body>
            </Card>
        </div>
    );

}

