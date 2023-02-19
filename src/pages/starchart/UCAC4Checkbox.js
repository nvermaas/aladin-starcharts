import React from 'react';
import { Form } from 'react-bootstrap';
import { useGlobalReducer } from '../../contexts/GlobalContext';

import {SET_HYGDATA_ENABLED, ALADIN_RELOAD, SET_UCAC4_ENABLED, RELOAD_UCAC4} from '../../contexts/GlobalStateReducer'

// typing in the search box will execute a filter and dispatch it. The observation screen responds instantly.
export default function UCAC4Checkbox(props) {
    const [ my_state , my_dispatch] = useGlobalReducer()

    const handleClick = (event) => {
        let checked = event.target.checked
        my_dispatch({type: SET_UCAC4_ENABLED, ucac4_enabled: checked})
        if (my_state.status_ucac4 == 'unfetched') {
            my_dispatch({type: RELOAD_UCAC4, reload_ucac4: !my_state.reload_ucac4})
        }
        my_dispatch({type: ALADIN_RELOAD, aladin_reload: !my_state.aladin_reload})
    }

    return (
        <Form>
            <Form.Check
                id="ucac4"
                label="UCAC4"
                checked = {my_state.ucac4_enabled}
                onClick={handleClick}
            />
        </Form>
    );


}
