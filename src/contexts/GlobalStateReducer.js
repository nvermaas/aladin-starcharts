// Nico Vermaas - 22 jan 2023
// This is the reducer for the global state provider.
import {config} from "./StaticConfig";

// possible actions

export const SET_STATUS_UCAC4 = 'SET_STATUS_UCAC4'
export const SET_FETCHED_UCAC4 = 'SET_FETCHED_UCAC4'
export const SET_NUMBER_OF_STARS = 'SET_NUMBER_OF_STARS'
export const SET_UCAC4_BACKEND = 'SET_UCAC4_BACKEND'
export const RELOAD_UCAC4 = 'RELOAD_UCAC4'

export const ALADIN_RA = 'ALADIN_RA'
export const ALADIN_DEC = 'ALADIN_DEC'
export const ALADIN_FOV = 'ALADIN_FOV'
export const ALADIN_SET_MOUSE = 'ALADIN_SET_MOUSE'
export const ALADIN_RELOAD = 'ALADIN_RELOAD'

export const SET_SELECTED_SURVEY = 'SET_SELECTED_SURVEY'
export const SET_SELECTED_OBJECT = 'SET_SELECTED_OBJECT'
export const SET_MAGNITUDE_LIMIT = 'SET_MAGNITUDE_LIMIT'
export const SET_DATA_LIMIT = 'SET_DATA_LIMIT'
export const SET_NR_OF_RINGS = 'SET_NR_OF_RINGS'

export const initialState = {

        status_ucac4       : "unfetched",
        fetched_ucac4      : undefined,
        number_of_stars    : 0,
        ucac4_backend       : config.backends[0],

        aladin_ra   : config.defaults.ra,
        aladin_dec  : config.defaults.dec,
        aladin_fov  : config.defaults.fov,
        aladin_mouse: "idle",

        selected_survey  : config.defaults.selected_survey,
        magnitude_limit  : 15,
        data_limit: 10000,
        nr_of_rings : 10,
        status_ucuc4 : "unfetched",
}

export const reducer = (state, action) => {

    console.log('action: '+action.type)

    switch (action.type) {

        case SET_STATUS_UCAC4:
            return {
                ...state,
                status_ucac4: action.status_ucac4
            };

        case SET_FETCHED_UCAC4:
            return {
                ...state,
                fetched_ucac4: action.fetched_ucac4
            };

        case RELOAD_UCAC4:
            return {
                ...state,
                reload_ucac4: action.reload_ucac4
            };

        case SET_UCAC4_BACKEND:
            return {
                ...state,
                ucac4_backend: action.ucac4_backend
            };

        case SET_NUMBER_OF_STARS:
            return {
                ...state,
                number_of_stars: action.number_of_stars
            };


        case ALADIN_RA:
            return {
                ...state,
                aladin_ra: action.aladin_ra
            };

        case ALADIN_DEC:
            return {
                ...state,
                aladin_dec: action.aladin_dec
            };

        case ALADIN_FOV:
            return {
                ...state,
                aladin_fov: action.aladin_fov
            };

        case ALADIN_SET_MOUSE:
            console.log(action.aladin_mouse)
            return {
                ...state,
                aladin_mouse: action.aladin_mouse
            };

        case ALADIN_RELOAD:
            return {
                ...state,
                aladin_reload: action.aladin_reload
            };


        case SET_SELECTED_SURVEY:
            return {
                ...state,
                selected_survey: action.selected_survey
            };

        case SET_SELECTED_OBJECT:
            return {
                ...state,
                selected_object: action.selected_object
            };

        case SET_MAGNITUDE_LIMIT:
            return {
                ...state,
                magnitude_limit: action.magnitude_limit
            };

        case SET_DATA_LIMIT:
            return {

                ...state,
                data_limit: action.data_limit
            };

        case SET_NR_OF_RINGS:
            return {

                ...state,
                nr_of_rings: action.nr_of_rings
            };

        default:
            return state;
    }
};