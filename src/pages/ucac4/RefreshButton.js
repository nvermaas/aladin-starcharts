import React from 'react';
import { Button } from 'react-bootstrap';
import { useGlobalReducer } from '../../contexts/GlobalContext';
import {RELOAD_UCAC4, SET_STATUS_UCAC4} from '../../contexts/GlobalStateReducer'

import { getReloadIcon } from '../../utils/styling'

export default function RefreshButton(props) {
    const [ my_state , my_dispatch] = useGlobalReducer()

    const handleClick = () => {
        my_dispatch({type: SET_STATUS_UCAC4, status_ucac4: 'unfetched'})
        my_dispatch({type: RELOAD_UCAC4, reload_ucac4: !my_state.reload_ucac4})
    }

    return <Button variant="outline-primary" onClick={() => handleClick()}>{getReloadIcon()}&nbsp;Reload Data</Button>
}