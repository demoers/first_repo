const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and view location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App!',
        name: 'Andrew Mead'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Andrew Mead'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Andrew Mead'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'Address is not provided.'
        })
    }

    geocode(req.query.address, (error, {longitude, latitude, place} = {}) => {
        if(error) {
            return res.send({error})
        } else {
            forecast(longitude, latitude, (error, data) => {
                if(error) {
                    return res.send({error})
                }

                res.send({
                    address: req.query.address,
                    place,
                    forecast: data
                })
            })
        }
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'Search term is not provided.'
        })
    }
    console.log(req.query.rating)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404_page', {
        title: '404',
        name: 'Andrew Mead',
        errorMsg: 'Help article not found!'
    })
})

app.get('*', (req, res) => {
    res.render('404_page', {
        title: '404',
        name: 'Andrew Mead',
        errorMsg: 'Page not found!'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})