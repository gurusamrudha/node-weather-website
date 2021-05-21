const request = require('request')

const geoCode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiZ3VydXNhbXJ1ZGgiLCJhIjoiY2tvdTNxZHA3MDF1azJ1bXA0OTJnbDJuZSJ9.E97-y-nkM6ox6nIDzepfaw&limit=1`

    request({url, json: true}, (error, { body }) => {
        if(error) {
            callback('Unable to connect to the location services!', undefined)
        } else if(body.features.length === 0) {
            callback('unable to find location. Try another search,', undefined)
        } else {
            callback(undefined, {
                Lattitude: body.features[0].center[1], 
                Logitude: body.features[0].center[0],
                Location: body.features[0].place_name
            })
        }
    })
}

module.exports = geoCode;