import React from 'react';
import { Button } from 'react-bootstrap';
import { useGlobalReducer } from '../../contexts/GlobalContext';
import {config} from "../../contexts/StaticConfig";

import {
    ALADIN_RA,
    ALADIN_DEC,
    ALADIN_FOV,
    SET_STATUS_UCAC4,
    RELOAD_UCAC4,
} from '../../contexts/GlobalStateReducer'

import { getResetIcon } from '../../utils/styling'

export default function ResetButton(props) {
    const [ my_state , my_dispatch] = useGlobalReducer()

    const handleClick = () => {
        my_dispatch({type: ALADIN_RA, aladin_ra: config.defaults.ra})
        my_dispatch({type: ALADIN_DEC, aladin_dec: config.defaults.dec})
        my_dispatch({type: ALADIN_FOV, aladin_fov: config.defaults.fov})

        my_dispatch({type: SET_STATUS_UCAC4, status_ucac4: 'unfetched'})
        my_dispatch({type: RELOAD_UCAC4, reload_ucac4: !my_state.reload_ucac4})
    }

    return <Button className="custom-btn" variant="outline-primary" onClick={() => handleClick()}>{getResetIcon()}&nbsp;Reset View</Button>
}