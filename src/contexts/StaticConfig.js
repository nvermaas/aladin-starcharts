
export const config = {
    "defaults" : {
        "ra": "250.42",
        "dec" : "36.45",
        "fov" : "1",
        "selected_survey"  : 'P/XMM/PN/color',
    },

    "surveys": [
        {
            "name": "P/DSS2/color",
            "title": "DSS Colored (optical)"
        },
        {
            "name": "P/allWISE/color",
            "title": "allWISE (infrared)"
        },
        {
            "name": "P/XMM/PN/color",
            "title": "XMM PN colored"
        },
        {
            "name": "P/IRIS/color",
            "title": "IRIS color"
        },
        {
            "name": "P/Fermi/color",
            "title": "Fermi color"
        },
        {
            "name": "P/AKARI/FIS/Color",
            "title": "AKARI FIS Color"
        },
    ],
    "color_maps": ["native", "grayscale", "cubehelix", "eosb", "rainbow"],

    "backends" : [
        {
            "name": "uilennest (psycopg2)",
            "url" : "https://uilennest.net/psycopg2",
        },
        {
            "name": "uilennest (asyncpg)",
            "url" : "https://uilennest.net/asyncpg",
        },
        {
            "name": "192.168.178.37:8011 (psycopg2)",
            "url" : "http://192.168.178.37:8011",
        },
        {
            "name": "192.168.178.37:8011 (asyncpg)",
            "url" : "http://192.168.178.37:8012",
        },
        {
            "name": "localhost:8000",
            "url" : "http://localhost:8000",
        },
        {
            "name": "SURF Research Cloud (psycopg2)",
            "url" : "http://145.38.187.31",
        },
    ]
}
