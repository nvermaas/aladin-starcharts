import React from 'react';
import { Form } from 'react-bootstrap';
import { useGlobalReducer } from '../../contexts/GlobalContext';

import {
    ALADIN_RELOAD,
    SET_VIZIER_ENABLED
} from '../../contexts/GlobalStateReducer'

export default function VizierCheckbox(props) {
    const [ my_state , my_dispatch] = useGlobalReducer()

    const handleClick = (event) => {
        let checked = event.target.checked
        my_dispatch({type: SET_VIZIER_ENABLED, vizier_enabled: checked})
        my_dispatch({type: ALADIN_RELOAD, aladin_reload: !my_state.aladin_reload})
    }

    return (
            <Form.Check
                inline
                id="vizier"
                label="Simbad"
                checked = {my_state.vizier_enabled}
                onClick={handleClick}
            />
    );
}
