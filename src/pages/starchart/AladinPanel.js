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
            setInstance(window.A.aladin(`#${el.id}`,{ survey: my_state.selected_survey, fov: my_state.fov }));
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

            instance.setImageSurvey(my_state.selected_survey)
        }
    }, [my_state.selected_survey]);


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
                        my_dispatch({type: SET_SELECTED_OBJECT, selected_object: object.data.id})
                    } catch (e) {
                    }
                }
            });

        }
    }, [my_state.aladin_reload])


    const addCircleToOverlay = (my_overlay, object, size, color) => {
        // ring algorithm
        // 2 deg = 3
        // 1 deg = 10

        // create n circles on equal distance to simulate filling
        let n = my_state.nr_of_rings
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

            let ucac4_catalog = window.A.catalog({
                name: 'UCAC4',
                shape: 'circle',
                color: 'yellow',
                sourceSize: 20,
                labelColumn: 'j_mag',
                displayLabel: false,
                onClick: 'showPopup'
            });

            //onClick: 'showTable'});

            // loop through all the objects and add them to the appropriate layer based a property
            if (data) {
                data.forEach(function (object) {
                    // draw a clickable icon for each observation
                    //addToCatalog(my_catalog, object)

                    // calculate a reasonable size based on magnitude
                    let m = object.j_mag
                    let base = Math.pow(((15000 - m) / 1000), 2)
                    let s = base / 20000

                    addCircleToOverlay(ucac4_overlay, object, s, 'white')
                    //addBoxesToOverlay(overlay_boxes, object, 0.01 "white")
                })

                aladin.addCatalog(ucac4_catalog);
            }
        }

        if (my_state.hygdata_enabled) {
            let hyg_boxes_overlay = window.A.graphicOverlay({name: 'boxes',color: 'red', lineWidth: 3});
            aladin.addOverlay(hyg_boxes_overlay);

            let my_label_catalog = window.A.catalog({
                name: 'label',
                shape: 'square',
                color: 'red',
                sourceSize: 30,
                labelColumn: 'id',
                displayLabel: false,
                onClick: 'showPopup'
            });

            if (hygdata) {
                hygdata.forEach(function (object) {
                    // draw a clickable icon for each observation

                    addBoxesToOverlay(hyg_boxes_overlay, object, 0.03, "red")
                })

                aladin.addCatalog(my_label_catalog);
            }
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
        let source = [window.A.source(
            object.ra,
            object.dec,
            {
                mpos1: object.mpos1,
                j_mag : Math.round(object.j_mag/100)/10,
            },
        )]

        my_catalog.addSources(source);
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