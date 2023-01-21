
function padDigits(number, digits) {
    return Array(Math.max(digits - String(number).length + 1, 0)).join(0) + number;
}

// based on http://www.bdnyc.org/2012/10/decimal-deg-to-hms/
// tested with http://www.astrouw.edu.pl/~jskowron/ra-dec/
function deg2HMS(ra) {
    if (ra < 0) {
        ra = ra + 360
    }

    var raH = padDigits(parseInt(ra/15),2)
    var raM = padDigits(parseInt(((ra/15)-raH)*60),2)
    var raS =  padDigits((((((ra/15)-raH)*60)-raM)*60).toFixed(2),5)

    //var result = sign + raH +':'+ raM +":"+ raS
    var result = raH + ' ' + raM + ' ' + raS

    return result
}

function deg2DMS(dec) {
    var sign = "+"
    if (dec < 0) {
        sign ="-"
        dec = -dec;
    }

    var deg = padDigits(parseInt(dec),2)
    var decM = padDigits(Math.abs(parseInt((dec-deg)*60)),2)
    var decS = padDigits(((Math.abs((dec-deg)*60)-decM)*60).toFixed(2),5)

    //var result = sign + deg +':'+ decM + ':' + decS
    var result = sign + deg + ' ' + decM + ' ' + decS
    return result
}

// hours, minutes, seconds to decimal degrees
function HMS2deg(ra) {
    let list = ra.split(' ')
    let degrees = parseFloat(list[0]) * 15 + parseFloat(list[1])/4 + parseFloat(list[2])/240
    return degrees
}

// degrees, minutes, seconds to decimal degrees
function DMS2deg(dec) {
    let list = dec.split(' ')

    let sign = 1
    let D = parseFloat(list[0])
    if (list[0][0] === '-') {
        sign = -1
        D = Math.abs(D)
    }
    let degrees = sign * (D + parseFloat(list[1])/60 + parseFloat(list[2])/3600)
    console.log('dec = '+dec+', degrees = '+degrees)
    return degrees
}

// radec can be in several (string) formats,
// parse it, convert it, and return as a list of floats.
// decimal floats is what we use in the database and for calculations,
// hence this function that can be used for more than just representation purposes.

export function parseRaDecToDecimals(input) {
    let decimals = []

    // determine the format of the input string (HMS/DMS or decimal).
    // "123.456 -12.345" or "08 13 49.44, -12 20 42.00"?

    // if s contains more than 1 space, then it is HMS/DMS. Otherwise it is decimal.
    let spaceCount = (input.split(" ").length - 1);
    // only convert to decimal is the format is HMS/DMS, otherwise output = input
    if (spaceCount === 1) {
        return input
    }

    let radec = input.split(',')
    if (!radec[1]) {
        return []
    }

    // get rid of the remaining spaces
    radec[0] = radec[0].trim()
    radec[1] = radec[1].trim()

    let ra_decimals = HMS2deg(radec[0])
    let dec_decimals = DMS2deg(radec[1])

    // return the results as a pair of floats
    if (ra_decimals!==undefined && dec_decimals!==undefined) {
        decimals.push(ra_decimals)
        decimals.push(dec_decimals)
    } else {
        return []
    }
    return decimals
}

// convert a string containing whatever RA,dec format into decimal coordinates
// return as a string, because it is for representation purposes
// example: "08 13 49.44, -12 20 42.00" => "123.456, -12.345"

export function toDecimalsLabel(input) {
    let decimals_string = "error"

    // get the decimal coordinates from the input string
    let decimals = parseRaDecToDecimals(input)
    if (decimals.length==2) {
        // create the representation
        decimals_string = decimals[0] + ', ' + decimals[1]
    }
    return decimals_string
}

// convert a string containing whatever RA,dec format into HMS
// return as a string, because it is for representation purposes
// example: "123.456 -12.345" => "08 13 49.44, -12 20 42.00"

export function toHMSLabel(input) {
    let hms_string = "error"

    // determine the format of the input string (HMS/DMS or decimal).
    // "123.456 -12.345" or "08 13 49.44, -12 20 42.00"?

    // if s contains more than 1 space, then it is HMS/DMS. Otherwise it is decimal.
    let spaceCount = (input.split(" ").length - 1);

    // only convert HMS/DMS if the format is decimal, otherwise output = input
    if (spaceCount > 1) {
        return input
    }

    try {
        let radec = input.split(',')
        if (!radec[1]) {
            return "error"
        }

        // get rid of the remaining spaces
        radec[0] = radec[0].trim()
        radec[1] = radec[1].trim()

        // convert to HMS and DMS
        let ra = deg2HMS(radec[0])
        let dec = deg2DMS(radec[1])

        hms_string = ra + ', ' + dec

        // check for invalid numbers
        if (hms_string.includes('NaN')) {
            hms_string = "error"
        }
    } finally {
    }

    return hms_string
}

export function toFOVLabel(fov) {
    let fov_label
    if (fov > 1) {
        fov_label = " FoV: " + Math.round(parseFloat(fov) * 100) / 100 + "\xB0"
    } else {
        fov_label = " FoV: " + Math.round(parseFloat(fov*60) * 100) / 100 + "\u2032"
    }
    return fov_label
}