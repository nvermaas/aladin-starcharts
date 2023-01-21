import React, {useState, useEffect} from 'react';
import {useGlobalReducer} from '../contexts/GlobalContext';
import {
    SET_STATUS_UCAC4,
    SET_FETCHED_UCAC4,
    SET_NUMBER_OF_STARS,
    ALADIN_RELOAD
} from '../contexts/GlobalStateReducer';


export default function FetchUCAC4(skipAbortController) {
    // use global state
    const [my_state, my_dispatch] = useGlobalReducer()
    const controller = new AbortController();

    useEffect(() => {
            fetchStars()

            if (!skipAbortController) {
                return () => {
                    controller.abort();
                };
            }
        }, [my_state.magnitude_limit, my_state.reload_ucac4]
    );

    // translate the state to different url parameters, depending on the type of backend (fastapi, drf)
    function constructUrl()  {
        let d = (my_state.aladin_fov / 2)
        let ra_min = Number(my_state.aladin_ra) - d
        let ra_max = Number(my_state.aladin_ra) + d
        let dec_min = Number(my_state.aladin_dec) - d
        let dec_max = Number(my_state.aladin_dec) + d

        let url = my_state.ucac4_backend_url[1] + "/stars_rectangle/?ra_min=" + ra_min.toString() + "&ra_max=" + ra_max.toString()
        url += "&dec_min=" + dec_min.toString() + "&dec_max=" + dec_max.toString()
        url += "&j_mag=" + (my_state.magnitude_limit*1000).toString()
        url += "&limit=" + my_state.data_limit.toString()

        return url
    }

    async function fetchStars()  {
        let url = constructUrl()

        my_dispatch({type: SET_STATUS_UCAC4, status_ucac4: 'fetching'})
        let startTime = new Date()

        try {
            const response = await fetch(url, {signal: controller.signal})
            const data = await response.json()

            let endTime = new Date()
            let timeDiff = endTime - startTime
            my_dispatch({type: SET_FETCHED_UCAC4, fetched_ucac4: data})
            my_dispatch({type: SET_NUMBER_OF_STARS, number_of_stars: data.length})
            my_dispatch({type: SET_STATUS_UCAC4, status_ucac4: 'fetched ('+timeDiff.toString()+' ms)'})
            my_dispatch({type: ALADIN_RELOAD, aladin_reload: !my_state.aladin_reload})

        } catch (error) {
            if (error.name === 'AbortError') {
                console.log('Fetch was aborted');
                my_dispatch({type: SET_NUMBER_OF_STARS, number_of_stars: 0})
                my_dispatch({type: SET_STATUS_UCAC4, status_ucac4: 'fetch aborted'})
            } else {
                my_dispatch({type: SET_NUMBER_OF_STARS, number_of_stars: 0})
                my_dispatch({type: SET_STATUS_UCAC4, status_ucac4: 'failed'})
            }
        }
    }

}