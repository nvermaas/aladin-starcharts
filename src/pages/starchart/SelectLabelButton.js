import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { useGlobalReducer } from '../../contexts/GlobalContext';
import {ALADIN_RELOAD, SET_LABEL_FIELD} from '../../contexts/GlobalStateReducer'
import {config} from "../../contexts/StaticConfig";

export default function SelectLabelButton() {
    const [ my_state , my_dispatch] = useGlobalReducer()

    const handleClick = (label_field) => {
        my_dispatch({type: SET_LABEL_FIELD, label_field: label_field})
        my_dispatch({type: ALADIN_RELOAD, aladin_reload: !my_state.aladin_reload})
    }

    let renderDropdownItems
    if (config.labelfields) {
        renderDropdownItems = config.labelfields.map(label_Field => {
            return <Dropdown.Item onClick={() => handleClick(label_Field)}>{label_Field}</Dropdown.Item>
        })
    }

    return <Dropdown>
        <Dropdown.Toggle variant="outline-primary" id="dropdown-basic">
            &nbsp;{my_state.label_field}
        </Dropdown.Toggle>

        <Dropdown.Menu>
            {renderDropdownItems}
        </Dropdown.Menu>
    </Dropdown>


}