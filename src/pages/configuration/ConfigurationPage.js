import React, {useEffect} from "react";
import { Row, Col, Card, Table } from 'react-bootstrap';

import { useGlobalReducer } from '../../contexts/GlobalContext';
import SelectBackendButton from "./SelectBackendButton";
import DataLimitBox from "./DataLimitBox";
import RingsBox from "./RingsBox";


export default function ConfigurationPage(props) {

    const [ my_state, my_dispatch] = useGlobalReducer()


    return (
        <div className="App">
            <Card>
                <Card.Body align={"left"}>
                    <Table>
                        <Row>
                            <Col sm={2} md={2} lg={2}>Select UCAC4 Backend    :</Col>
                        </Row>
                        <Row>
                            <Col sm={2} md={2} lg={2}><SelectBackendButton /></Col>
                        </Row>
                        <hr></hr>
                        <Row>
                            <Col sm={4} md={4} lg={4}>Max stars : <DataLimitBox/></Col>
                            <Col sm={4} md={4} lg={4}>Rings : <RingsBox/></Col>
                        </Row>
                    </Table>

                </Card.Body>
            </Card>
        </div>
    );
}