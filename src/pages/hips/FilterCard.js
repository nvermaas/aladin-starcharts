import React from 'react';
import {Card, Button, Table, Image } from 'react-bootstrap'
import { useGlobalReducer } from '../../contexts/GlobalContext';

import CatalogFilterButton from './CatalogFilterButton'
import SurveyFilterButton from './SurveyFilterButton'
import MagnitudeBox from './MagnitudeBox'

export default function FilterCard(props) {
    const [ my_state , my_dispatch] = useGlobalReducer()

    return (
        <div className="App">
            <Card>

                <Card.Body align={"left"}>
                    <tr><td><h5>Select HiPS Survey and Catalog</h5></td></tr>
                    <tr><td><CatalogFilterButton/></td></tr>
                    <tr><td><SurveyFilterButton/></td></tr>
                    <tr><td><MagnitudeBox/></td></tr>
                </Card.Body>
            </Card>
        </div>
    );

}

