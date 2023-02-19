import React from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';
import { useGlobalReducer } from '../../contexts/GlobalContext';

import {SET_HYGDATA_ENABLED, ALADIN_RELOAD} from '../../contexts/GlobalStateReducer'

// typing in the search box will execute a filter and dispatch it. The observation screen responds instantly.
export default function HygDataCheckbox(props) {
    const [ my_state , my_dispatch] = useGlobalReducer()

    const handleClick = (event) => {
        let checked = event.target.checked
        my_dispatch({type: SET_HYGDATA_ENABLED, hygdata_enabled: checked})
        my_dispatch({type: ALADIN_RELOAD, aladin_reload: !my_state.reload_ucac4})
    }

    return (
        <Form>
            <Form.Check
                id="hygdata"
                label="Labels"
                checked = {my_state.hygdata_enabled}
                onClick={handleClick}
            />
        </Form>
    );


}
