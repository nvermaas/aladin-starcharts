import React from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';
import { useGlobalReducer } from '../../contexts/GlobalContext';
import { filterPlanets } from '../../utils/selection'
import { getBackspaceIcon } from '../../utils/styling'

import {
    SET_MAGNITUDE_LIMIT,

} from '../../contexts/GlobalStateReducer'

// typing in the search box will execute a filter and dispatch it. The observation screen responds instantly.
export default function MagnitudeBox(props) {
    const [ my_state , my_dispatch] = useGlobalReducer()

    let text_to_search




    // use if you want the search to start while you hit enter
        const handleKeyUp = (event) => {

        let magnitude_limit = event.target.value.toUpperCase()

        //if (event.charCode === 13) {
            my_dispatch({type: SET_MAGNITUDE_LIMIT, magnitude_limit: magnitude_limit})

            // prevent the enter key to reload the whole page
            //event.preventDefault()
        //}

    }

    return <Form inline>
        <td>
            <FormControl
                type="text"
                placeholder= {my_state.magnitude_limit}
                className="mr-sm-1"
                onKeyUp={handleKeyUp}>
            </FormControl>
        </td>
        </Form>


}
