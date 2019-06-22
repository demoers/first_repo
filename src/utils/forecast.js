const request = require('request')

const forecast = (longitude, latitude, callback) => {
    const url = 'https://api.darksky.net/forecast/290b4eee414a8f91c8e5dfe4a70536b9/' + latitude + ',' + longitude + '?units=si'

    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect the server! Check connection', undefined)
        } else if (body.error) {
            callback(body.error, undefined)
        } else {
            const first = body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees out. There is ' + body.currently.precipProbability + '% chance of rain.';
            const second = 'Temperature High: ' + body.daily.data[0].temperatureHigh + ' and Temperature Low: ' + body.daily.data[0].temperatureLow;
            callback(undefined, first + second)
        }
    })
}

module.exports = forecast