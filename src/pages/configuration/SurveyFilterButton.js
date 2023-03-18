import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { useGlobalReducer } from '../../contexts/GlobalContext';
import {config} from "../../contexts/StaticConfig";
import { SET_SELECTED_SURVEY, ALADIN_RELOAD} from '../../contexts/GlobalStateReducer'

export default function SurveyFilterButton() {
    const [ my_state , my_dispatch] = useGlobalReducer()

    const handleClick = (survey) => {
        my_dispatch({type: SET_SELECTED_SURVEY, selected_survey: survey})
        my_dispatch({type: ALADIN_RELOAD, aladin_reload: !my_state.aladin_reload})
    }

    let renderDropdownItems
    if (config.surveys) {
        renderDropdownItems = config.surveys.map(survey => {
            return <Dropdown.Item onClick={() => handleClick(survey.name)}>{survey.name}</Dropdown.Item>
        })
    }

    return <Dropdown>
        <Dropdown.Toggle variant="outline-primary" id="dropdown-basic">
            {my_state.selected_survey}
        </Dropdown.Toggle>

        <Dropdown.Menu>
            {renderDropdownItems}
        </Dropdown.Menu>
    </Dropdown>


}