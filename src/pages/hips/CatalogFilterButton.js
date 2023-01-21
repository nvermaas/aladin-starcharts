import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { useGlobalReducer } from '../../contexts/GlobalContext';
import { SET_SELECTED_CATALOG} from '../../contexts/GlobalStateReducer'

import { getCatalogIcon, getSurveyIcon } from '../../utils/styling'

export default function CatalogFilterButton() {
    const [ my_state , my_dispatch] = useGlobalReducer()

    const handleClick = (catalog) => {
        my_dispatch({type: SET_SELECTED_CATALOG, selected_catalog: catalog})
    }


    return <Dropdown>
        <Dropdown.Toggle variant="outline-primary" id="dropdown-basic">
            {getCatalogIcon()}&nbsp;HiPS Catalog: {my_state.selected_catalog}
        </Dropdown.Toggle>

        <Dropdown.Menu>
            <Dropdown.Item onClick={() => handleClick("https://uilennest.net/hips/hipparcos/")}>Hipparcos (CDS)</Dropdown.Item>
            <Dropdown.Item onClick={() => handleClick("https://uilennest.net/hips/tycho2/")}>Tycho2 (CDS)</Dropdown.Item>
        </Dropdown.Menu>
    </Dropdown>


}