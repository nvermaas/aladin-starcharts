// Nico Vermaas - 22 jan 2023
// This is the reducer for the global state provider.
import {config} from "./StaticConfig";

// possible actions
export const SET_UCAC4_ENABLED = 'SET_UCAC4_ENABLED'
export const SET_STATUS_UCAC4 = 'SET_STATUS_UCAC4'
export const SET_FETCHED_UCAC4 = 'SET_FETCHED_UCAC4'
export const SET_NUMBER_OF_STARS = 'SET_NUMBER_OF_STARS'
export const SET_UCAC4_BACKEND = 'SET_UCAC4_BACKEND'
export const RELOAD_UCAC4 = 'RELOAD_UCAC4'

export const SET_STATUS_HYGDATA = 'SET_STATUS_HYGDATA'
export const SET_FETCHED_HYGDATA = 'SET_FETCHED_HYGDATA'
export const SET_NUMBER_OF_HYGDATA = 'SET_NUMBER_OF_HYGDATA'
export const SET_HYGDATA_ENABLED = 'SET_HYGDATA_ENABLED'
export const SET_LABELS_ENABLED = 'SET_LABELS_ENABLED'

export const ALADIN_RA = 'ALADIN_RA'
export const ALADIN_DEC = 'ALADIN_DEC'
export const ALADIN_FOV = 'ALADIN_FOV'
export const ALADIN_SET_MOUSE = 'ALADIN_SET_MOUSE'
export const ALADIN_RELOAD = 'ALADIN_RELOAD'

export const SET_SELECTED_SURVEY = 'SET_SELECTED_SURVEY'
export const SET_SURVEY_ENABLED = 'SET_SURVEY_ENABLED'
export const SET_SELECTED_OBJECT = 'SET_SELECTED_OBJECT'
export const SET_MAGNITUDE_LIMIT = 'SET_MAGNITUDE_LIMIT'
export const SET_DATA_LIMIT = 'SET_DATA_LIMIT'
export const SET_NR_OF_RINGS = 'SET_NR_OF_RINGS'

export const URL_PARAMS_CHECKED = 'URL_PARAMS_CHECKED'

export const initialState = {

        status_ucac4       : "unfetched",
        fetched_ucac4      : undefined,
        number_of_stars    : 0,
        ucac4_enabled      : true,
        ucac4_backend       : config.backends[0],

        status_hygdata       : "unfetched",
        fetched_hygdata      : undefined,
        number_of_hygdata    : 0,
        hygdata_enabled      : false,
        labels_enabled      : false,

        aladin_ra   : config.defaults.ra,
        aladin_dec  : config.defaults.dec,
        aladin_fov  : config.defaults.fov,
        aladin_mouse: "idle",

        selected_survey  : config.defaults.selected_survey,
        survey_enabled : false,
        magnitude_limit  : 15,
        data_limit: 10000,
        nr_of_rings : 10,
        url_params_checked : false,
}

export const reducer = (state, action) => {

    console.log('action: '+action.type)

    switch (action.type) {

        case SET_UCAC4_ENABLED:
            return {
                ...state,
                ucac4_enabled: action.ucac4_enabled
            };

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

        case SET_HYGDATA_ENABLED:
            return {
                ...state,
                hygdata_enabled: action.hygdata_enabled
            };

        case SET_LABELS_ENABLED:
            return {
                ...state,
                labels_enabled: action.labels_enabled
            };

        case SET_STATUS_HYGDATA:
            return {
                ...state,
                status_hygdata: action.status_hygdata
            };

        case SET_FETCHED_HYGDATA:
            return {
                ...state,
                fetched_hygdata: action.fetched_hygdata
            };

        case SET_NUMBER_OF_HYGDATA:
            return {
                ...state,
                number_of_hygdata: action.number_of_hygdata
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

        case SET_SURVEY_ENABLED:
            return {
                ...state,
                hygdata_enabled: action.hygdata_enabled
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

        case URL_PARAMS_CHECKED:
            return {
                ...state,
                url_params_checked: action.url_params_checked
            };

        default:
            return state;
    }
};