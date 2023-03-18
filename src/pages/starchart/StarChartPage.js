import React, {useEffect} from "react";
import { Container, Row, Col, Card, Table } from 'react-bootstrap';

import { useGlobalReducer } from '../../contexts/GlobalContext';
import {
    ALADIN_RA,
    ALADIN_DEC,
    ALADIN_FOV,
    RELOAD_UCAC4,
    SET_CHART_NAME,
    URL_PARAMS_CHECKED,
    SET_EXTRA_PLOTTING
} from '../../contexts/GlobalStateReducer'

import LeftPanel from './LeftPanel'
import AladinPanel from "./AladinPanel";

export default function StarChartPage(props) {

    const [ my_state, my_dispatch] = useGlobalReducer()

    // check the incoming url parameters only once
    if (!my_state.url_params_checked) {
        let ra = props.params.get("ra")
        let dec = props.params.get("dec")
        let fov = props.params.get("fov")
        let name = props.params.get("name")
        let extra = props.params.get("extra")

        if (ra) {
            my_dispatch({type: ALADIN_RA, aladin_ra: ra})
        }
        if (dec) {
            my_dispatch({type: ALADIN_DEC, aladin_dec: dec})
        }
        if (fov) {
            my_dispatch({type: ALADIN_FOV, aladin_fov: fov})
        }
        if (name) {
            my_dispatch({type: SET_CHART_NAME, chart_name: name})
        }
        if (extra) {
            my_dispatch({type: SET_EXTRA_PLOTTING, extra_plotting: extra})
        }
        if (ra || dec || fov) {
            my_dispatch({type: RELOAD_UCAC4, reload_ucac4: !my_state.reload_ucac4})
        }

        my_dispatch({type: URL_PARAMS_CHECKED, url_params_checked: true})
    }
    return (
        <div>
            <Container fluid>
                <Row>
                    <Col sm={3} md={3} lg={3}>
                        <LeftPanel/>

                    </Col>
                    <Col sm={9} md={9} lg={9}>
                        <Card>
                            <AladinPanel
                                survey={my_state.selected_survey}
                                data={my_state.fetched_ucac4}
                                hygdata={my_state.fetched_hygdata}/>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}