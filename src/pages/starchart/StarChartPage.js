import React, {useEffect} from "react";
import { Container, Row, Col, Card, Table } from 'react-bootstrap';

import { useGlobalReducer } from '../../contexts/GlobalContext';

import LeftPanel from './LeftPanel'
import AladinPanel from "./AladinPanel";

export default function StarChartPage(props) {

    const [ my_state, my_dispatch] = useGlobalReducer()

    return (
        <div>
            <Container fluid>
                <Row>
                    <Col sm={3} md={3} lg={3}>
                        <LeftPanel/>

                    </Col>
                    <Col sm={9} md={9} lg={9}>
                        <Card>
                            <AladinPanel survey={my_state.selected_survey} data={my_state.fetched_ucac4}/>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}