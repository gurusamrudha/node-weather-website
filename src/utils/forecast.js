const request = require('request')

const forecast = (lat, long, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=1d4f1386e9b601eefa4817be39f2c2a4&query=${lat},${long}.4233&units=m`

    request({url, json: true}, (error, { body }) => {
        if(error) {
            callback('Unable to connect to weather service', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, {
                temperature: body.current.temperature,
                description: body.current.weather_descriptions[0]
            })
        }

    })
}

module.exports = forecast