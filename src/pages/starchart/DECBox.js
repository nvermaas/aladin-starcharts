import React from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';
import { useGlobalReducer } from '../../contexts/GlobalContext';

import {RELOAD_UCAC4, ALADIN_DEC} from '../../contexts/GlobalStateReducer'

// typing in the search box will execute a filter and dispatch it. The observation screen responds instantly.
export default function DECBox(props) {
    const [ my_state , my_dispatch] = useGlobalReducer()

    // use if you want the search to start while you hit enter
        const handleKeyDown = (event) => {
        let aladin_dec = event.target.value.toUpperCase()

        if (event.keyCode === 13) {
            my_dispatch({type: ALADIN_DEC, aladin_dec: aladin_dec})
            my_dispatch({type: RELOAD_UCAC4, aladin_reload: !my_state.aladin_reload})

            // prevent the enter key to reload the whole page
            event.preventDefault()
        }

    }

    return <Form inline>
        <div>
            <FormControl
                type="text"
                //value= {my_state.magnitude_limit}
                placeholder= {Number(my_state.aladin_dec).toFixed(2)}
                className="mr-sm-1"
                onKeyDown={handleKeyDown}>
            </FormControl>
        </div>
        </Form>


}
