import React from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';
import { useGlobalReducer } from '../../contexts/GlobalContext';

import {RELOAD_UCAC4, SET_DATA_LIMIT} from '../../contexts/GlobalStateReducer'

// typing in the search box will execute a filter and dispatch it. The observation screen responds instantly.
export default function DataLimitBox(props) {
    const [ my_state , my_dispatch] = useGlobalReducer()

    // use if you want the search to start while you hit enter
    const handleKeyDown = (event) => {

        if (event.keyCode === 13) {
            alert(event.target.value)
            let data_limit = event.target.value.toUpperCase()
            my_dispatch({type: RELOAD_UCAC4, reload_ucac4: !my_state.reload_ucac4})
            my_dispatch({type: SET_DATA_LIMIT, data_limit: data_limit})

            // prevent the enter key to reload the whole page
            event.preventDefault()
        }

    }

    return <Form inline>
        <div>
            <FormControl
                type="text"
                placeholder= {my_state.data_limit}
                className="mr-sm-1"
                onKeyDown={handleKeyDown}>
            </FormControl>
        </div>
    </Form>

}
