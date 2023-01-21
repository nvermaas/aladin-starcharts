import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { useGlobalReducer } from '../../contexts/GlobalContext';
import { SET_SELECTED_SURVEY} from '../../contexts/GlobalStateReducer'

import { getSurveyIcon } from '../../utils/styling'

export default function SurveyFilterButton() {
    const [ my_state , my_dispatch] = useGlobalReducer()

    const handleClick = (survey) => {
        my_dispatch({type: SET_SELECTED_SURVEY, selected_survey: survey})
    }


    return <Dropdown>
        <Dropdown.Toggle variant="outline-primary" id="dropdown-basic">
            {getSurveyIcon()}&nbsp;HiPS Survey: {my_state.selected_survey}
        </Dropdown.Toggle>

        <Dropdown.Menu>
            <Dropdown.Item onClick={() => handleClick("P/DSS2/color")}>P/DSS2/color</Dropdown.Item>
            <Dropdown.Item onClick={() => handleClick("P/allWISE/color")}>P/allWISE/color</Dropdown.Item>
            <Dropdown.Item onClick={() => handleClick("P/XMM/PN/color")}>P/XMM/PN/color</Dropdown.Item>
            <Dropdown.Item onClick={() => handleClick("P/Fermi/color")}>P/Fermi/color</Dropdown.Item>
            <Dropdown.Item onClick={() => handleClick("P/AKARI/FIS/Color")}>P/AKARI/FIS/Color</Dropdown.Item>
        </Dropdown.Menu>
    </Dropdown>


}