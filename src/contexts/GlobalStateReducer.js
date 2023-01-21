// Nico Vermaas - 2 jul 2021
// This is the reducer for the global state provider.

// possible actions
export const SET_STATUS_ASTEROIDS = 'SET_STATUS_ASTEROIDS'
export const SET_FETCHED_ASTEROIDS = 'SET_FETCHED_ASTEROIDS'

export const SET_STATUS_EXOPLANETS = 'SET_STATUS_EXOPLANETS'
export const SET_FETCHED_EXOPLANETS = 'SET_FETCHED_EXOPLANETS'
export const SET_FILTERED_EXOPLANETS = 'SET_FILTERED_EXOPLANETS'
export const SET_SELECTED_EXOPLANET = 'SET_SELECTED_EXOPLANET'

export const SET_STATUS_UCAC4 = 'SET_STATUS_UCAC4'
export const SET_FETCHED_UCAC4 = 'SET_FETCHED_UCAC4'
export const SET_NUMBER_OF_STARS = 'SET_NUMBER_OF_STARS'
export const SET_UCAC4_BACKEND_URL = 'SET_UCAC4_BACKEND_URL'
export const RELOAD_UCAC4 = 'RELOAD_UCAC4'

export const SET_STATUS_ADEX = 'SET_STATUS_ADEX'
export const SET_FETCHED_ADEX = 'SET_FETCHED_ADEX'
export const SET_NUMBER_OF_DATAPRODUCTS = 'SET_NUMBER_OF_DATAPRODUCTS'
export const SET_ADEX_BACKEND_URL = 'SET_ADEX_BACKEND_URL'
export const RELOAD_ADEX = 'RELOAD_ADEX'
export const ADEX_RA = 'ADEX_RA'
export const ADEX_DEC = 'ADEX_DEC'
export const ADEX_FOV = 'ADEX_FOV'
export const SET_LEVEL = 'SET_LEVEL'
export const SET_COLLECTION = 'SET_COLLECTION'
export const SET_DATAPRODUCT_TYPE = 'SET_DATAPRODUCT_TYPE'
export const SET_DATAPRODUCT_SUBTYPE = 'SET_DATAPRODUCT_SUBTYPE'

export const ALADIN_RA = 'ALADIN_RA'
export const ALADIN_DEC = 'ALADIN_DEC'
export const ALADIN_FOV = 'ALADIN_FOV'
export const ALADIN_SET_MOUSE = 'ALADIN_SET_MOUSE'
export const ALADIN_RELOAD = 'ALADIN_RELOAD'

export const SHOW_PLANETLIST = 'SHOW_PLANETLIST'

// HIPS page
export const SET_SELECTED_SURVEY = 'SET_SELECTED_SURVEY'
export const SET_SELECTED_OBJECT = 'SET_SELECTED_OBJECT'
export const SET_SELECTED_CATALOG = 'SET_SELECTED_CATALOG'
export const SET_MAGNITUDE_LIMIT = 'SET_MAGNITUDE_LIMIT'
export const SET_DATA_LIMIT = 'SET_DATA_LIMIT'

export const initialState = {
        status_asteroids   : "unfetched",
        fetched_asteroids  : undefined,

        status_exoplanets  : "unfetched",
        fetched_exoplanets : undefined,
        filtered_exoplanets: undefined,
        selected_exoplanet : undefined,

        status_ucac4       : "unfetched",
        fetched_ucac4      : undefined,
        number_of_stars    : 0,
        ucac4_backend_url  : ['uilennest (psycopg2)','https://uilennest.net/psycopg2'],

        // ADEX
        status_adex       : "unfetched",
        fetched_adex      : undefined,
        number_of_dataproducts : 0,
        adex_backend_url   : ['sdc-dev.astron.nl','https://sdc-dev.astron.nl'],
        adex_ra: "40.0",
        adex_dec: "40.0",
        adex_fov: "30",
        level : "2",
        collection : "apertif-imaging",
        dataproduct_type: "image",
        dataproduct_subtype: "continuumMF",

        aladin_ra: "82.0",
        aladin_dec: "7.0",
        aladin_fov: "0.5",
        aladin_mouse: "idle",

        show_planetlist  : false,

        selected_survey  : 'DSS colored',
        selected_catalog : 'tycho2',
        magnitude_limit  : 15,
        data_limit: 10000,
        status_ucuc4 : "unfetched",
}

export const reducer = (state, action) => {
    console.log('action: '+action.type)
    switch (action.type) {

        case SET_STATUS_ASTEROIDS:
            return {
                ...state,
                status_asteroids: action.status_asteroids
            };

        case SET_FETCHED_ASTEROIDS:
            return {
                ...state,
                fetched_asteroids: action.fetched_asteroids
            };

        case SET_STATUS_EXOPLANETS:
            return {
                ...state,
                status_exoplanets: action.status_exoplanets
            };

        case SET_FETCHED_EXOPLANETS:
            return {
                ...state,
                fetched_exoplanets: action.fetched_exoplanets
            };

        case SET_FILTERED_EXOPLANETS:
            return {
                ...state,
                filtered_exoplanets: action.filtered_exoplanets
            };

        case SET_SELECTED_EXOPLANET:
            //alert(action.selected_exoplanet)
            return {
                ...state,
                selected_exoplanet: action.selected_exoplanet
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

        case SET_UCAC4_BACKEND_URL:

            return {
                ...state,
                ucac4_backend_url: action.ucac4_backend_url
            };

        case SET_NUMBER_OF_STARS:
            return {
                ...state,
                number_of_stars: action.number_of_stars
            };

        case SET_STATUS_ADEX:
            return {
                ...state,
                status_adex: action.status_adex
            };

        case SET_FETCHED_ADEX:
            return {
                ...state,
                fetched_adex: action.fetched_adex
            };

        case RELOAD_ADEX:
            return {
                ...state,
                reload_adex: action.reload_adex
            };

        case SET_ADEX_BACKEND_URL:
            return {
                ...state,
                adex_backend_url: action.adex_backend_url
            };

        case SET_NUMBER_OF_DATAPRODUCTS:
            return {
                ...state,
                number_of_dataproducts: action.number_of_dataproducts
            };

        case ADEX_RA:

            return {
                ...state,
                adex_ra: action.adex_ra
            };

        case ADEX_DEC:
            return {
                ...state,
                adex_dec: action.adex_dec
            };

        case ADEX_FOV:
            return {
                ...state,
                adex_fov: action.adex_fov
            };

        case SET_LEVEL:
            return {
                ...state,
                level: action.level
            };

        case SET_COLLECTION:
            return {
                ...state,
                collection: action.collection
            };

        case SET_DATAPRODUCT_TYPE:
            return {
                ...state,
                dataproduct_type: action.dataproduct_type
            };

        case SET_DATAPRODUCT_SUBTYPE:
            return {
                ...state,
                dataproduct_subtype: action.dataproduct_subtype
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

        case SHOW_PLANETLIST:

            return {
                ...state,
                show_planetlist: action.show_planetlist
            };

        case SET_SELECTED_SURVEY:
            return {
                ...state,
                selected_survey: action.selected_survey
            };

        case SET_SELECTED_CATALOG:
            return {
                ...state,
                selected_catalog: action.selected_catalog
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

        default:
            return state;
    }
};