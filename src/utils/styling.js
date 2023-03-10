import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon, faStar, faStarAndCrescent, faWrench, faSatellite, faMeteor, faGlobe, faMap,
    faBolt, faQuestionCircle, faImage, faCloudMeatball, faRecycle, faClock, faArrowsAlt, faBackspace}
    from '@fortawesome/free-solid-svg-icons'


export const getStarsIcon = (stars) => {
    let icon = faStar
    let color = "darkgreen"
    let size = 'grey'

    if (stars) {
        icon = faStar
        size = "md"
        color = "green"
    } else {
        icon = ["far", "faStar"]
        size = "md"
        color="grey"
    }
    return <FontAwesomeIcon size={size} icon={icon} color={color}  />
}

export const getClockIcon = () => {
    let icon = faClock
    let color = "darkblue"
    let size = 'sm'
    return <FontAwesomeIcon size={size} icon={icon} color={color}  />
}

export const getMoveIcon = () => {
    let icon = faArrowsAlt
    let color = "darkblue"
    let size = 'sm'
    return <FontAwesomeIcon size={size} icon={icon} color={color}  />
}

export const getBackspaceIcon = () => {
    let icon = faBackspace
    let color = "darkblue"
    let size = 'sm'
    return <FontAwesomeIcon size={size} icon={icon} color={color}  />
}

export const getCatalogIcon = () => {
    let icon = faGlobe
    let color = "darkblue"
    let size = 'sm'
    return <FontAwesomeIcon size={size} icon={icon} color={color}  />
}

export const getSurveyIcon = () => {
    let icon = faMap
    let color = "darkblue"
    let size = 'sm'
    return <FontAwesomeIcon size={size} icon={icon} color={color}  />
}

export const getReloadIcon = () => {
    let icon = faRecycle
    let color = "darkblue"
    let size = 'sm'
    return <FontAwesomeIcon size={size} icon={icon} color={color}  />
}

export const getResetIcon = () => {
    let icon = faGlobe
    let color = "darkblue"
    let size = 'sm'
    return <FontAwesomeIcon size={size} icon={icon} color={color}  />
}