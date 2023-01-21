import React from 'react';

import { useGlobalReducer } from '../../contexts/GlobalContext'
import {
    SET_SELECTED_EXOPLANET,
    ALADIN_RA,
    ALADIN_DEC,
    ALADIN_FOV,
    RELOAD_UCAC4
} from '../../contexts/GlobalStateReducer'

const Aladin = (props) => {
    const [ my_state , my_dispatch] = useGlobalReducer()
    const refreshFactor = 0.5

    // this function not only sets the new SkyCoords,
    // but also triggers a reload of the data when the SkyCoords have changed.
    const setNewSkyCoords = (newSkyCoords) => {

        let x1 = parseFloat(my_state.aladin_ra)
        let x2 = parseFloat(newSkyCoords[0])
        let y1 = parseFloat(my_state.aladin_dec)
        let y2 = parseFloat(newSkyCoords[1])

        let move_factor_x = Math.abs((x2 - x1) / parseFloat(my_state.aladin_fov))
        let move_factor_y = Math.abs((y2 - y1) / parseFloat(my_state.aladin_fov))

        // refresh conditionally
        if ((move_factor_x > refreshFactor) || (move_factor_y > refreshFactor)) {
            my_dispatch({type: ALADIN_RA, aladin_ra: newSkyCoords[0]})
            my_dispatch({type: ALADIN_DEC, aladin_dec: newSkyCoords[1]})
            my_dispatch({type: RELOAD_UCAC4, reload_ucac4: !my_state.reload_ucac4})
        }
    }

    const setNewFov = (newFov) => {
        // don't be too sensitive about refreshing when zooming in/out
        let old_fov = (parseFloat(my_state.aladin_fov))
        let new_fov = (parseFloat(newFov[0]))
        //alert(old_fov.toString() + ", " + new_fov.toString())
        // refresh conditionally
        let zoom_factor = Math.min(old_fov, new_fov) / Math.max(old_fov, new_fov)

        if (zoom_factor < refreshFactor) {
            my_dispatch({type: ALADIN_FOV, aladin_fov: newFov[0]})
            my_dispatch({type: RELOAD_UCAC4, reload_ucac4: !my_state.reload_ucac4})
        }
    }


    React.useEffect(() => {

        let aladin = window.A.aladin('#aladin-lite-div', { survey: 'P/DSS2/color', fov:60 })
        aladin.setFov(parseFloat(my_state.aladin_fov))
        aladin.gotoRaDec(my_state.aladin_ra, my_state.aladin_dec)

        aladin.setImageSurvey(my_state.selected_survey)

        // create the catalog layer
        createLayers(aladin, props.data)

        // add a listener to aladin
        // define function triggered when  a source is hovered
        aladin.on('objectHovered', function(object) {

            // when an object is hovered, store the ra,dec,fov in the global state
            // (because I found no better or more accurate way of doing this).

            let radec = aladin.getRaDec()
            my_dispatch({type: ALADIN_RA, aladin_ra: radec[0]})
            my_dispatch({type: ALADIN_DEC, aladin_dec: radec[1]})

            let fov = aladin.getFov()
            my_dispatch({type: ALADIN_FOV, aladin_fov: fov[0]})

            if (object) {
                try {
                    // select the object under the mouse cursor, and store it in global state
                    my_dispatch({type: SET_SELECTED_EXOPLANET, selected_exoplanet: object.data.planet})
                } catch (e) {
                }
            }
        });

        // callback when the field of view in aladin is changed
        aladin.on('zoomChanged', function() {
            let fov = aladin.getFov()
            setNewFov(fov)
        })

        // callback when the sky position in aladin is changed
        aladin.on('positionChanged', function() {
            let radec = aladin.getRaDec()
            setNewSkyCoords(radec)

            //let fov = aladin.getFov()
            //setNewFov(fov)
        })

    }, [my_state.fetched_ucac4, my_state.aladin_reload])


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

    return (
        <div>
            <div id='aladin-lite-div' className="aladin"  />
        </div>
    )
}

export default Aladin