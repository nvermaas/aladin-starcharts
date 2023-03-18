import React, { useState, useRef, useEffect } from 'react';

import { useGlobalReducer } from '../../contexts/GlobalContext'
import { config } from '../../contexts/StaticConfig';
import {
    ALADIN_RA,
    ALADIN_DEC,
    ALADIN_FOV,
    ALADIN_SET_MOUSE,
    SET_SELECTED_OBJECT,
    RELOAD_UCAC4
} from '../../contexts/GlobalStateReducer'
import {getShapes} from "../../utils/selection";

const AladinPanel = (props) => {
    const ref = useRef();
    const [instance, setInstance] = useState(null);
    const [ my_state , my_dispatch] = useGlobalReducer()

    const setNewSkyCoords = (newSkyCoords) => {
        my_dispatch({type: ALADIN_RA, aladin_ra: newSkyCoords[0]})
        my_dispatch({type: ALADIN_DEC, aladin_dec: newSkyCoords[1]})
        my_dispatch({type: RELOAD_UCAC4, reload_ucac4: !my_state.reload_ucac4})
    }

    const setNewFov = (newFov, reload_data) => {
        my_dispatch({type: ALADIN_FOV, aladin_fov: newFov[0]})
        if (reload_data) {
            my_dispatch({type: RELOAD_UCAC4, reload_ucac4: !my_state.reload_ucac4})
        }
    }


    // only render this once when the page is mounted.
    useEffect(() => {

        if (ref.current) {
            const el = ref.current;
            setInstance(window.A.aladin(`#${el.id}`,{ survey: my_state.no_survey, fov: my_state.fov }));
            console.log("AladinPanel mounted");

            // trigger a fetch of the data
            //my_dispatch({type: RELOAD_UCAC4, reload_ucac4: !my_state.reload_ucac4})

            return () => {
                console.log("AladinPanel unmounted");
                // TODO: remove listeners?
                // Check if everything is correctly cleared.

                // Destroy aladin SkyView
                el.innerHTML = "";
                setInstance(null);
            }
        }

    }, []);


    // only render this when the background survey is changed, to prevent 'flickering'
    useEffect(() => {
        if (instance) {
            console.log('useEffect for change in: my_state.selected_survey')
            if (config.surveys) {
                config.surveys.forEach((survey_config) => {
                    // only create survey layers for hips files
                    if (survey_config['hips_name']) {
                        instance.createImageSurvey(
                            survey_config['hips_name'],
                            survey_config['hips_name'],
                            survey_config['hips_url'],
                            "equatorial",
                            13,
                            {imgFormat: survey_config['format']}
                        )
                    }
                });
            }

            if (my_state.survey_enabled) {
                instance.setImageSurvey(my_state.selected_survey)
            } else {
                instance.setImageSurvey(my_state.no_survey)
            }
        }
    }, [my_state.selected_survey, my_state.survey_enabled]);


    // render on 'aladin_reload'
    useEffect(() => {

        if (instance) {
            console.log('useEffect for change in: my_state.aladin_reload')

            instance.setFov(parseFloat(my_state.aladin_fov))
            instance.gotoRaDec(my_state.aladin_ra, my_state.aladin_dec)

            // create the catalog layer
            createLayers(instance, props.data, props.hygdata)

            // callback when the field of view in aladin is changed
            // note: the reason for using 'zoomChanged' instead of a OnMouseWheel event on the <div> for this
            // is that OnMouseWheel causes race condition.
            // Because aladin doesn't update its fov as fast as the 'state', causing a bit of a shaky movement when zooming out.
            instance.on('zoomChanged', function() {
                let fov = instance.getFov()

                // to prevent the effect of rounding the fov when setting/reading it
                let change_ratio = Math.abs((my_state.aladin_fov / fov[0])-1)
                console.log('ratio = '+change_ratio.toString())
                if (my_state.aladin_fov < fov[0] && (change_ratio > 0.1)) {
                    setNewFov(fov, true)
                } else {
                    setNewFov(fov, false)
                }

            })

            // add a listener to aladin
            // define function triggered when  a source is hovered
            instance.on('objectHovered', function (object) {

                if (object) {

                    try {
                        // select the object under the mouse cursor, and store it in global state
                        my_dispatch({type: SET_SELECTED_OBJECT, selected_object: object.data.HipparcosID})
                    } catch (e) {
                    }
                }
            });

        }
    }, [my_state.aladin_reload])


    const addCircleToOverlay = (my_overlay, object, magnitude, color) => {
        // ring algorithm
        // 2 deg = 3
        // 1 deg = 10

        // how many rings are needed?
        // depends on zoom level and magnitude

        let base = Math.pow(((15000 - magnitude) / 1000), 2)
        let size = base / 20000

        // adjust n based on size.
        let pixel_distance = size / my_state.aladin_fov * 100
        console.error(pixel_distance)

        // create n circles on equal distance to simulate filling
        let n = my_state.nr_of_rings
        //let n = Math.round(pixel_distance + 5)

        let d = size/n

        let s = size
        for (let i = 0; i < n; i++) {
            my_overlay.add(window.A.circle(object.ra, object.dec,s, {color: color, lineWidth: 2}));
            s = s - d
            //alert(s)
        }
    }

    const addBoxesToOverlay = (my_overlay, object, size, color) => {
        let box = getBox(object,size)
        my_overlay.add(window.A.polyline(box, {color: color, lineWidth: 1}));
    }

    // create the catalog layer
    const createLayers = (aladin, data, hygdata) => {

        aladin.removeLayers()

        if (my_state.ucac4_enabled) {

            let ucac4_overlay = window.A.graphicOverlay({name: 'stars',color: 'white', lineWidth: 1});
            aladin.addOverlay(ucac4_overlay);

            // loop through all the objects and add them to the appropriate layer based a property
            if (data) {
                data.forEach(function (object) {
                    // calculate a reasonable size based on magnitude
                    addCircleToOverlay(ucac4_overlay, object, object.j_mag, 'white')
                })
            }
        }

        if (my_state.hygdata_enabled) {

            let hyg_catalog = window.A.catalog({
                name: 'hyg_catalog',
                shape: 'square',
                color: 'black',
                sourceSize: 0,
                //labelColumn: 'HipparcosID',
                labelColumn: my_state.label_field,
                displayLabel: my_state.hygdata_enabled,
                labelFont: '16px sans-serif',
                labelColor: 'yellow',
                onClick: 'showPopup'
            });

            if (hygdata) {
                hygdata.forEach(function (object) {
                    // draw a clickable icon for each observation
                    // add to catalog to get a clickable object.
                    // this means that every object is the same size and shape also.
                    // Which is okay for HYG, but not for UCAC4, because those stars are scaled by magnitude
                    addToCatalog(hyg_catalog, object)

                    //addBoxesToOverlay(hyg_boxes_overlay, object, 0.03, "red")
                })

                aladin.addCatalog(hyg_catalog);
            }

        }

        if (my_state.extra_plotting_enabled) {



            if (my_state.extra_plotting) {
                let extra_plotting = JSON.parse(my_state.extra_plotting)

                // create a catalog per shape
                let extra_plotting_plus = getShapes(extra_plotting,'cross')

                let extra_catalog_plus = window.A.catalog({
                    name: 'extra_catalog_plus',
                    shape: "plus",
                    color: 'red',
                    sourceSize: 10,
                    labelColumn: "label",
                    displayLabel: my_state.extra_plotting_enabled,
                    labelFont: '16px sans-serif',
                    labelColor: 'red',
                    onClick: 'showPopup'
                });

                extra_plotting_plus.forEach(function (object) {
                    addToCatalog(extra_catalog_plus, object)
                })

                aladin.addCatalog(extra_catalog_plus);

                let extra_plotting_circle = getShapes(extra_plotting,'circle_outline')

                let extra_catalog_circle = window.A.catalog({
                    name: 'extra_catalog_circle',
                    shape: "circle",
                    color: 'yellow',
                    sourceSize: 20,
                    labelColumn: "label",
                    displayLabel: my_state.extra_plotting_enabled,
                    labelFont: '16px sans-serif',
                    labelColor: 'yellow',
                    onClick: 'showPopup'
                });

                extra_plotting_circle.forEach(function (object) {
                    addToCatalog(extra_catalog_circle, object)
                })

                aladin.addCatalog(extra_catalog_circle);
            }


            //aladin.addCatalog(window.A.catalogFromNED('16 41 40 +36 27 00', 1, {onClick: 'showPopup', shape: 'plus'}));
        }
    }

    // get the bounding box in world coordinates from an observation
    const getBox = (object,size) => {
        let point1 = [object.RightAscension-(0.5 * size),object.Declination-(0.5 * size)]
        let point2 = [object.RightAscension+(0.5 * size),object.Declination-(0.5 * size)]
        let point3 = [object.RightAscension+(0.5 * size),object.Declination+(0.5 * size)]
        let point4 = [object.RightAscension-(0.5 * size),object.Declination+(0.5 * size)]
        let box = [point1,point2,point3,point4,point1]
        return box
    }

    const addToCatalog = (my_catalog, object) => {

        if (my_catalog.name === 'hyg_catalog') {
            let source = [window.A.source(
                object.RightAscension,
                object.Declination,
                {
                    HipparcosID: object.HipparcosID,
                    BayerFlamsteed: object.BayerFlamsteed,
                    HenryDraperID: object.HenryDraperID,
                    HarvardRevisedID: object.HarvardRevisedID,
                    ProperName: object.ProperName,
                    GlieseID: object.GlieseID,
                    Magnitude: object.Magnitude,
                },
            )]
            my_catalog.addSources(source);
        }

        if (my_catalog.name === 'extra_catalog_plus') {
            let source = [window.A.source(
                object.ra,
                object.dec,
                {
                    label: object.label,
                },
            )]
            my_catalog.addSources(source);
        }

        if (my_catalog.name === 'extra_catalog_circle') {
            let source = [window.A.source(
                object.ra,
                object.dec,
                {
                    label: object.label,
                },
            )]
            my_catalog.addSources(source);
        }
    }


    function handleMouseDown() {
        my_dispatch({type: ALADIN_SET_MOUSE, aladin_mouse: 'onMouseDown, start dragging'})
    }

    function handleMouseUp() {
        my_dispatch({type: ALADIN_SET_MOUSE, aladin_mouse: 'onMouseUp, end dragging => setNewSkyCoords()'})
        let radec = instance.getRaDec()
        setNewSkyCoords(radec)
    }

    return (
        <div
            ref={ref}
            id='my-aladin'
            className="aladin"
            onMouseDownCapture={handleMouseDown}
            onMouseUp={handleMouseUp}
        />
    )
}

export default AladinPanel