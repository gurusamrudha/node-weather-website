const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handelbars engine and view location 
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Guru Samrudh'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        name: 'Guru Samrudh',
        title: 'About me'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an valid address'
        })
    }
    geocode(req.query.address, (error, {Lattitude, Logitude, Location}= {}) => {
        if(error) {
            res.send({ error })
            
        } else if(Lattitude && Logitude) {
            forecast(Lattitude, Logitude, (error, {temperature, description}= {}) => {
                if(error) {
                    res.send({ error })
                } else if(temperature && description) {
                    res.send({
                        forecast: `It is currently ${temperature} degree, with ${description}`,
                        Location
                    })
                }
            })
        }
    })
    
})

    

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide an search term'
        })
    }
    console.log(req.query.search);
    res.send({
        products: [],
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Guru Samrudh',
        helpText: 'Help Content'
    })
})

app.get('/help/*', (req, res) => {
    res.render('notfound', {
        title: '404',
        name: 'Guru Samrudh',
        errorMessage: 'Help Article not found'
    })
})

app.get('*', (req, res) => {
    res.render('notfound', {
        title: '404',
        name: 'Guru Samrudh',
        errorMessage: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Serever is up on port ' + port);
})