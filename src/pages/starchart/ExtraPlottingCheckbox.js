import React from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';
import { useGlobalReducer } from '../../contexts/GlobalContext';

import {
    SET_HYGDATA_ENABLED,
    ALADIN_RELOAD,
    SET_EXTRA_PLOTTING,
    SET_EXTRA_PLOTTING_ENABLED
} from '../../contexts/GlobalStateReducer'

export default function ExtraPlottingCheckbox(props) {
    const [ my_state , my_dispatch] = useGlobalReducer()

    const handleClick = (event) => {
        let checked = event.target.checked
        my_dispatch({type: SET_EXTRA_PLOTTING_ENABLED, extra_plotting_enabled: checked})
        my_dispatch({type: ALADIN_RELOAD, aladin_reload: !my_state.aladin_reload})
    }

    return (

            <Form.Check
                inline
                id="extra"
                label="Extra"
                checked = {my_state.SET_EXTRA_PLOTTING_ENABLED}
                onClick={handleClick}
            />

    );


}
