import React from 'react';
import { Form } from 'react-bootstrap';
import { useGlobalReducer } from '../../contexts/GlobalContext';

import UCAC4Checkbox from "./UCAC4Checkbox";
import HygDataCheckbox from "./HygDataCheckbox";

import SurveyCheckbox from "./SurveyCheckbox";
import ExtraPlottingCheckbox from "./ExtraPlottingCheckbox";
import SimbadCheckbox from "./SimbadCheckbox";

// typing in the search box will execute a filter and dispatch it. The observation screen responds instantly.
export default function InlineCheckboxesLayers(props) {
    const [ my_state , my_dispatch] = useGlobalReducer()

    let renderExtra
    if (my_state.extra_plotting) {
        renderExtra = <ExtraPlottingCheckbox />
    }

    return (
        <Form>
            <UCAC4Checkbox />
            <HygDataCheckbox />
            <SurveyCheckbox />
            <SimbadCheckbox />
            {renderExtra}
        </Form>
    );


}
