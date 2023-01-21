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
            my_dispatch({type: RELOAD_UCAC4, reload_ucac4: !my_state.reload_ucac4})

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
            createLayers(instance, props.data)

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


    const addCirclesToOverlay = (my_overlay, object, color, size) => {
        my_overlay.add(window.A.circle(object.ra, object.dec,size, {color: color, lineWidth: 2}));
    }

    // create the catalog layer
    const createLayers = (aladin, data) => {

        aladin.removeLayers()

        let my_catalog = window.A.catalog({
            name: 'UCAC4',
            shape : 'circle',
            color : 'yellow',
            sourceSize: 20,
            labelColumn: 'j_mag',
            displayLabel: false,
            onClick: 'showPopup'});
        //onClick: 'showTable'});

        // loop through all the objects and add them to the appropriate layer based a property
        if (data) {
            data.forEach(function (object) {
                // draw a clickable icon for each observation
                addToCatalog(my_catalog, object)
            })

            aladin.addCatalog(my_catalog);
        }
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