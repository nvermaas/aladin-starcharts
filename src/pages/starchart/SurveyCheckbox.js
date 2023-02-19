import React from 'react';
import { Form, } from 'react-bootstrap';
import { useGlobalReducer } from '../../contexts/GlobalContext';

import {ALADIN_RELOAD, SET_SURVEY_ENABLED} from '../../contexts/GlobalStateReducer'

export default function SurveyCheckbox(props) {
    const [ my_state , my_dispatch] = useGlobalReducer()

    const handleClick = (event) => {
        let checked = event.target.checked
        my_dispatch({type: SET_SURVEY_ENABLED, survey_enabled: checked})
        my_dispatch({type: ALADIN_RELOAD, aladin_reload: !my_state.aladin_reload})
    }

    return (

            <Form.Check
                inline
                id="survey"
                label="DSS"
                checked = {my_state.survey_enabled}
                onClick={handleClick}
            />

    );


}
