import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { useGlobalReducer } from '../../contexts/GlobalContext';
import {RELOAD_UCAC4, SET_UCAC4_BACKEND} from '../../contexts/GlobalStateReducer'
import {config} from "../../contexts/StaticConfig";

export default function SelectBackendButton() {
    const [ my_state , my_dispatch] = useGlobalReducer()

    const handleClick = (ucac4_backend) => {
        my_dispatch({type: SET_UCAC4_BACKEND, ucac4_backend: ucac4_backend})
        my_dispatch({type: RELOAD_UCAC4, reload_ucac4: !my_state.reload_ucac4})
    }

    let renderDropdownItems
    if (config.backends) {
        renderDropdownItems = config.backends.map(backend => {
            return <Dropdown.Item onClick={() => handleClick(backend)}>{backend.name}</Dropdown.Item>
        })
    }

    return <Dropdown>
        <Dropdown.Toggle variant="outline-primary" id="dropdown-basic">
            &nbsp;{my_state.ucac4_backend.name}
        </Dropdown.Toggle>

        <Dropdown.Menu>
            {renderDropdownItems}
        </Dropdown.Menu>
    </Dropdown>


}