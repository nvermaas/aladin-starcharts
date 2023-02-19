import React from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';
import { useGlobalReducer } from '../../contexts/GlobalContext';

import {SET_HYGDATA_ENABLED, ALADIN_RELOAD} from '../../contexts/GlobalStateReducer'

export default function StarLabelsCheckbox(props) {
    const [ my_state , my_dispatch] = useGlobalReducer()

    const handleClick = (event) => {
        let checked = event.target.checked
        my_dispatch({type: SET_HYGDATA_ENABLED, hygdata_enabled: checked})
        my_dispatch({type: ALADIN_RELOAD, aladin_reload: !my_state.aladin_reload})
    }

    return (

        <Form.Check
            inline
            id="starlabels"
            label="Labels"
            checked = {my_state.hygdata_enabled}
            onClick={handleClick}
        />

    );


}
