import React, {useState, useEffect} from 'react';
import {useGlobalReducer} from '../contexts/GlobalContext';
import {
    SET_STATUS_HYGDATA,
    SET_FETCHED_HYGDATA,
    SET_NUMBER_OF_HYGDATA,
    ALADIN_RELOAD
} from '../contexts/GlobalStateReducer';


export default function FetchHygData(skipAbortController) {
    // use global state
    const [my_state, my_dispatch] = useGlobalReducer()
    const controller = new AbortController();

    useEffect(() => {
            if (my_state.hygdata_enabled) {
                fetchHygData()
            }
            if (!skipAbortController) {
                return () => {
                    controller.abort();
                };
            }
        }, [my_state.reload_ucac4, my_state.hygdata_enabled]
    );

    // translate the state to different url parameters, depending on the type of backend (fastapi, drf)
    function constructUrl()  {
        let d = (my_state.aladin_fov / 2)
        let ra_min = Number(my_state.aladin_ra) - d
        let ra_max = Number(my_state.aladin_ra) + d
        let dec_min = Number(my_state.aladin_dec) - d
        let dec_max = Number(my_state.aladin_dec) + d

        let url = my_state.ucac4_backend.url + "/hygdata_rectangle/?ra_min=" + ra_min.toString() + "&ra_max=" + ra_max.toString()
        url += "&dec_min=" + dec_min.toString() + "&dec_max=" + dec_max.toString()
        url += "&magnitude=" + (my_state.magnitude_limit).toString()
        url += "&limit=" + my_state.data_limit.toString()

        return url
    }

    async function fetchHygData()  {
        let url = constructUrl()

        my_dispatch({type: SET_STATUS_HYGDATA, status_hygdata: 'fetching'})
        let startTime = new Date()

        try {
            const response = await fetch(url, {signal: controller.signal})
            const data = await response.json()

            let endTime = new Date()
            let timeDiff = endTime - startTime
            my_dispatch({type: SET_FETCHED_HYGDATA, fetched_hygdata: data})
            my_dispatch({type: SET_NUMBER_OF_HYGDATA, number_of_hygdata: data.length})
            my_dispatch({type: SET_STATUS_HYGDATA, status_hygdata: 'fetched ('+timeDiff.toString()+' ms)'})
            my_dispatch({type: ALADIN_RELOAD, aladin_reload: !my_state.aladin_reload})

        } catch (error) {
            if (error.name === 'AbortError') {
                console.log('Fetch was aborted');
                my_dispatch({type: SET_NUMBER_OF_HYGDATA, number_of_hygdata: 0})
            } else {
                alert(error)
                my_dispatch({type: SET_NUMBER_OF_HYGDATA, number_of_hygdata: 0})
                my_dispatch({type: SET_STATUS_HYGDATA, status_hygdata: error})
            }
        }
    }

}