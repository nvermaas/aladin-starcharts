import React from 'react';
import {Container, Card, Col, Row, Button, Table, Image } from 'react-bootstrap'

import { useGlobalReducer } from '../../contexts/GlobalContext';
import { toHMSLabel, toFOVLabel } from '../../utils/coordinates'
import MagnitudeBox from './MagnitudeBox'
import DataLimitBox from './DataLimitBox'
import RefreshButton from "./RefreshButton";
import SelectBackendButton from "./SelectBackendButton"
import SurveyFilterButton from "./SurveyFilterButton";

export default function LeftPanel(props) {
    const [ my_state , my_dispatch] = useGlobalReducer()

    const renderRADec = (ra,dec) => {
        try {
            let ra_label = Number(ra).toFixed(2)
            let dec_label = Number(dec).toFixed(2)
            let radec_label = ra_label + ', ' + dec_label
            return <div>{toHMSLabel(radec_label)} </div>
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
                        <Row><Col sm={4} md={4} lg={4}>Backend:</Col><Col sm={8} md={8} lg={8}> {my_state.ucac4_backend_url[0]}</Col></Row>
                        <Row><Col sm={4} md={4} lg={4}>Status :</Col><Col sm={8} md={8} lg={8}>  {my_state.status_ucac4}</Col></Row>
                        <Row><Col sm={4} md={4} lg={4}>DPS:</Col><Col sm={8} md={8} lg={8}>  {my_state.number_of_stars}</Col></Row>
                        <Row><Col sm={4} md={4} lg={4}>Position:</Col><Col sm={8} md={8} lg={8}>  {renderRADec(my_state.aladin_ra, my_state.aladin_dec)}</Col></Row>
                        <Row><Col sm={4} md={4} lg={4}>FoV:</Col><Col sm={8} md={8} lg={8}>  {Math.round(my_state.aladin_fov*100)/100} deg</Col></Row>

                        <Row></Row>

                        <hr></hr>
                        <Row><Col>Choose Backend    :</Col></Row>
                        <Row><Col><SelectBackendButton /></Col></Row>
                        <Row><Col>Background Survey (HiPS) :</Col></Row>
                        <Row><Col><SurveyFilterButton /></Col></Row>
                        <Row><Col>Magnitude Limit: <MagnitudeBox/></Col></Row>
                        <Row><Col>Max Records    : <DataLimitBox/></Col></Row>
                    </table>
                </Card.Body>
            </Card>
        </div>
    );

}

