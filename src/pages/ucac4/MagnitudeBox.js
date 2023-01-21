import React from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';
import { useGlobalReducer } from '../../contexts/GlobalContext';

import {RELOAD_UCAC4, SET_MAGNITUDE_LIMIT} from '../../contexts/GlobalStateReducer'

// typing in the search box will execute a filter and dispatch it. The observation screen responds instantly.
export default function MagnitudeBox(props) {
    const [ my_state , my_dispatch] = useGlobalReducer()

    // use if you want the search to start while you hit enter
        const handleKeyDown = (event) => {
        let magnitude_limit = event.target.value.toUpperCase()

        if (event.keyCode === 13) {
            my_dispatch({type: SET_MAGNITUDE_LIMIT, magnitude_limit: magnitude_limit})
            my_dispatch({type: RELOAD_UCAC4, reload_ucac4: !my_state.reload_ucac4})

            // prevent the enter key to reload the whole page
            event.preventDefault()
        }

    }

    return <Form inline>
        <div>
            <FormControl
                type="text"
                //value= {my_state.magnitude_limit}
                placeholder= {my_state.magnitude_limit}
                className="mr-sm-1"
                onKeyDown={handleKeyDown}>
            </FormControl>
        </div>
        </Form>


}
