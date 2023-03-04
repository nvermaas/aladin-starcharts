import React from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';
import { useGlobalReducer } from '../../contexts/GlobalContext';

import {SET_HYGDATA_ENABLED, ALADIN_RELOAD} from '../../contexts/GlobalStateReducer'
import UCAC4Checkbox from "./UCAC4Checkbox";
import HygDataCheckbox from "./HygDataCheckbox";
import StarLabelsCheckbox from "./StarLabelsCheckbox";
import SurveyCheckbox from "./SurveyCheckbox";

// typing in the search box will execute a filter and dispatch it. The observation screen responds instantly.
export default function InlineCheckboxesLayers(props) {


    return (
        <Form>
            <UCAC4Checkbox />
            <HygDataCheckbox />
            <SurveyCheckbox />
        </Form>
    );


}
