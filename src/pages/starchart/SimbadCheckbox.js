import React from 'react';
import { Form } from 'react-bootstrap';
import { useGlobalReducer } from '../../contexts/GlobalContext';

import {
    ALADIN_RELOAD,
    SET_SIMBAD_ENABLED
} from '../../contexts/GlobalStateReducer'

export default function SimbadCheckbox(props) {
    const [ my_state , my_dispatch] = useGlobalReducer()

    const handleClick = (event) => {
        let checked = event.target.checked
        my_dispatch({type: SET_SIMBAD_ENABLED, simbad_enabled: checked})
        my_dispatch({type: ALADIN_RELOAD, aladin_reload: !my_state.aladin_reload})
    }

    return (
            <Form.Check
                inline
                id="simbad"
                label="Simbad"
                checked = {my_state.simbad_enabled}
                onClick={handleClick}
            />
    );
}
