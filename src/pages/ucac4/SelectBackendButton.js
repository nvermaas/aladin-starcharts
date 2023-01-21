import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { useGlobalReducer } from '../../contexts/GlobalContext';
import {RELOAD_UCAC4, SET_UCAC4_BACKEND_URL} from '../../contexts/GlobalStateReducer'

export default function SelectBackendButton() {
    const [ my_state , my_dispatch] = useGlobalReducer()

    const handleClick = (ucac4_backend_url) => {
        my_dispatch({type: SET_UCAC4_BACKEND_URL, ucac4_backend_url: ucac4_backend_url})
        my_dispatch({type: RELOAD_UCAC4, reload_ucac4: !my_state.reload_ucac4})
    }


    return <Dropdown>
        <Dropdown.Toggle variant="outline-primary" id="dropdown-basic">
            &nbsp;{my_state.ucac4_backend_url[0]}
        </Dropdown.Toggle>

        <Dropdown.Menu>
            <Dropdown.Item onClick={() => handleClick(['uilennest (psycopg2)','https://uilennest.net/psycopg2'])}>Uilennest psycopg2</Dropdown.Item>
            <Dropdown.Item onClick={() => handleClick(['uilennest (asyncpg)','https://uilennest.net/asyncpg'])}>Uilennest asyncpg</Dropdown.Item>
            <Dropdown.Item onClick={() => handleClick(['192.168.178.37:8011 (psycopg2)','http://192.168.178.37:8011'])}>192.168.178.37:8011 (psycopg2)</Dropdown.Item>
            <Dropdown.Item onClick={() => handleClick(['192.168.178.37:8012 (asyncpg)','http://192.168.178.37:8012'])}>192.168.178.37:8012 (asyncpg)</Dropdown.Item>
            <Dropdown.Item onClick={() => handleClick(['localhost:8000','http://localhost:8000'])}>localhost:8000</Dropdown.Item>
            <Dropdown.Item onClick={() => handleClick(['SURF Research Cloud (psycopg2)','http://145.38.187.31'])}>SURF Research Cloud (psycopg2)</Dropdown.Item>
        </Dropdown.Menu>
    </Dropdown>


}