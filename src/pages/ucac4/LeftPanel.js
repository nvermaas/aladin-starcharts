import React from 'react';
import {Container, Card, Col, Row, Button, Table, Image } from 'react-bootstrap'

import { useGlobalReducer } from '../../contexts/GlobalContext';
import { toHMSLabel, toFOVLabel } from '../../utils/coordinates'
import MagnitudeBox from './MagnitudeBox'
import DataLimitBox from './DataLimitBox'
import RefreshButton from "./RefreshButton";
import SelectBackendButton from "./SelectBackendButton"

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
                        <Row><Col sm={5} md={5} lg={5}>Backend:</Col><Col sm={7} md={7} lg={7}> {my_state.ucac4_backend.url}</Col></Row>
                        <Row><Col sm={5} md={5} lg={5}>Status :</Col><Col sm={7} md={7} lg={7}>  {my_state.status_ucac4}</Col></Row>
                        <Row><Col sm={5} md={5} lg={5}>Stars:</Col><Col sm={7} md={7} lg={7}>  {my_state.number_of_stars}</Col></Row>
                        <Row></Row>
                        <Row><Col>{renderRADec(my_state.aladin_ra, my_state.aladin_dec)}</Col></Row>
                        <tr>---------------------------------</tr>
                        <tr><td>Magnitude Limit: <MagnitudeBox/></td></tr>
                        <tr><td>Max Records    : <DataLimitBox/></td></tr>
                        <tr><td>Choose Backend:</td></tr>
                        <SelectBackendButton />
                        <RefreshButton />
                    </table>
                </Card.Body>
            </Card>
        </div>
    );

}

