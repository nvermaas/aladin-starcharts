import React from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';
import { useGlobalReducer } from '../../contexts/GlobalContext';

import {ALADIN_RELOAD, SET_NR_OF_RINGS} from '../../contexts/GlobalStateReducer'

// typing in the search box will execute a filter and dispatch it. The observation screen responds instantly.
export default function RingsBox(props) {
    const [ my_state , my_dispatch] = useGlobalReducer()

    // use if you want the search to start while you hit enter
        const handleKeyDown = (event) => {
        let nr_of_rings = event.target.value.toUpperCase()

        if (event.keyCode === 13) {
            my_dispatch({type: SET_NR_OF_RINGS, nr_of_rings: nr_of_rings})
            my_dispatch({type: ALADIN_RELOAD, aladin_reload: !my_state.aladin_reload})

            // prevent the enter key to reload the whole page
            event.preventDefault()
        }

    }

    return <Form inline>
        <div>
            <FormControl
                type="text"
                placeholder= {my_state.nr_of_rings}
                className="mr-sm-1"
                onKeyDown={handleKeyDown}>
            </FormControl>
        </div>
        </Form>


}
