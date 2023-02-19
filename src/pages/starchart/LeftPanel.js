import React from 'react';
import {Container, Card, Col, Row, Button, Table, Image } from 'react-bootstrap'

import { useGlobalReducer } from '../../contexts/GlobalContext';
import { toHMSLabel, toFOVLabel } from '../../utils/coordinates'
import MagnitudeBox from './MagnitudeBox'
import DataLimitBox from './DataLimitBox'
import RefreshButton from "./RefreshButton";
import ResetButton from "./ResetButton";
import SelectBackendButton from "./SelectBackendButton"
import SurveyFilterButton from "./SurveyFilterButton";
import RABox from "./RABox";
import DECBox from "./DECBox";
import RingsBox from "./RingsBox";
import HygDataCheckbox from "./HygDataCheckbox";
import UCAC4Checkbox from "./UCAC4Checkbox";
import InlineCheckboxesLayers from "./InlineCheckboxesLayers";

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
                        <Row><Col sm={4} md={4} lg={4}>Object :</Col><Col sm={8} md={8} lg={8}> {my_state.selected_object}</Col></Row>

                        <Row></Row>

                        <hr></hr>
                        <Row><Col>Choose Backend    :</Col></Row>
                        <Row><Col><SelectBackendButton /></Col></Row>
                        <Row><Col><InlineCheckboxesLayers /></Col></Row>

                        <Row>
                            <Col sm={4} md={4} lg={4}>Mag Limit: <MagnitudeBox/></Col>
                            <Col sm={4} md={4} lg={4}>Max stars : <DataLimitBox/></Col>
                            <Col sm={4} md={4} lg={4}>Rings : <RingsBox/></Col>
                        </Row>
                        <Row>
                            <Col sm={4} md={4} lg={4}>RA : <RABox/></Col>
                            <Col sm={4} md={4} lg={4}>dec : <DECBox/></Col>
                        </Row>
                        <Row><Col><ResetButton /></Col></Row>
                        <Row><Col><RefreshButton /></Col></Row>
                    </table>
                </Card.Body>
            </Card>
        </div>
    );

}

