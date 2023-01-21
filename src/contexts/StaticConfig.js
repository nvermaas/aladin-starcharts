
export const config = {
    "defaults" : {
        "ra": "40",
        "dec" : "40",
        "fov" : "30",
        "collection" : "apertif-imaging",
        "dataproduct_type": "image",
        "dataproduct_subtype": "continuumMF",
        "selected_survey"  : 'DSS colored',
    },

    "surveys": [
        {
            "name": "--- ASTRON HiPS ---",
            "selectable" : false,
        },
        {
            "name": "apertif_dr1",
            "hips_name": "apertif_dr1",
            "hips_url": "https://hips.astron.nl/ASTRON/P/apertif_dr1",
            "format": "png"
        },
        {
            "name": "lotss_dr1_low",
            "hips_name": "lotss_dr1_low",
            "hips_url": "https://hips.astron.nl/ASTRON/P/lotss_dr1_low",
            "format": "png"
        },
        {
            "name": "lotss_dr1_high",
            "hips_name": "lotss_dr1_high",
            "hips_url": "https://hips.astron.nl/ASTRON/P/lotss_dr1_high",
            "format": "png"
        },
        {
            "name": "tgssadr",
            "hips_name": "tgssadr",
            "hips_url": "https://hips.astron.nl/ASTRON/P/tgssadr",
            "format": "png"
        },
        {
            "name": "lotss_dr2_low",
            "hips_name": "lotss_dr2_low",
            "hips_url": "https://hips.astron.nl/ASTRON/P/lotss_dr2_low",
            "format": "png"
        },
        {
            "name": "lotss_dr2_high",
            "hips_name": "lotss_dr2_high",
            "hips_url": "https://hips.astron.nl/ASTRON/P/lotss_dr2_high",
            "format": "png"
        },
        {
            "name": "--- Aladin HiPS ---",
        },
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
            "name": "SURF Research Cloud (django)",
            "type": "drf",
            "url" : "http://145.38.187.31",
        },
        {
            "name": "SURF Research Cloud (fastapi)",
            "type": "fastapi",
            "url" : "http://145.38.187.31",
        },
        {
            "name": "localhost:8000 (django)",
            "type": "drf",
            "url" : "http://localhost:8000",
        },
        {
            "name": "localhost:8000 (fastapi)",
            "type": "fastapi",
            "url" : "http://localhost:8000",
        },
        {
            "name": "sdc-dev.astron.nl (django)",
            "type": "drf",
            "url" : "https://sdc-dev.astron.nl",
        },
        {
            "name": "sdc-dev.astron.nl (fastapi)",
            "type": "fastapi",
            "url" : "https://sdc-dev.astron.nl",
        },
        {
            "name": "sdc.astron.nl (django)",
            "type": "drf",
            "url" : "https://sdc.astron.nl",
        },
        {
            "name": "sdc.astron.nl (fastapi)",
            "type": "fastapi",
            "url" : "https://sdc.astron.nl",
        },
        {
            "name": "localhost WSL-2 (django)",
            "type": "drf",
            "url" : "http://localhost",
        },
        {
            "name": "localhost WSL-2 (fastapi)",
            "type": "fastapi",
            "url" : "http://localhost",
        },
    ]
}
