const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) +'.json?access_token=pk.eyJ1Ijoic3VuZGVyZ2hlbGFuaSIsImEiOiJjand0NHkwZmswYnN3NDNtdXlhYTIxcGFlIn0.CMmJoYQULzBHijT_uVusIA'

    request({ url, json: true}, (error, {body} = {}) => {
        if (error) {
            callback('Unable to connect the server! Check connection', undefined)
        } else if (body.features.length === 0) {
            callback('No match found! Enter correct place', undefined)
        } else {
            callback(undefined, {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                place: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode