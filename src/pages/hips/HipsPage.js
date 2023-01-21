import React from 'react';
import { Container, Row, Col, Card, Table } from 'react-bootstrap';

import LoadingSpinner from '../../components/LoadingSpinner';
import { useGlobalReducer } from '../../contexts/GlobalContext';

import FilterCard from './FilterCard'
import Aladin from './Aladin'

export default function HipsPage(props) {

    const [ my_state, my_dispatch] = useGlobalReducer()

    // https://stackoverflow.com/questions/61347860/using-aladin-lite-app-not-built-for-react-in-react-app
    let defaultSurvey = {survey: "P/DSS2/color"}
    let fov = my_state.aladin_fov

    return (
        <div>
            <Container fluid>
                <Row>
                    <Col sm={3} md={3} lg={3}>
                        <FilterCard/>

                    </Col>
                    <Col sm={9} md={9} lg={9}>
                        <Card>
                            <Aladin catalog={my_state.selected_catalog} survey={my_state.selected_survey}/>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}