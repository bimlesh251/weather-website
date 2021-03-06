const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

const port = process.env.PORT || 3000

// define paths for express config

const publicDirectoryPath = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')

// setup handlebars engine and location
app.set('view engine', 'hbs');
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

// setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req, res)=>{
    res.render('index',{
        title:'Weather',
        name : 'Bimlesh Tiwari'
    })
})
app.get('/about', (req, res)=>{
    res.render('about', {
        title:'About Me',
        name:'Bimlesh Tiwari'
    })
})

app.get('/help', (req, res)=> {
    res.render('help', {
        title:'Help page',
        helpText:'Need Help? Feel free to contact us',
        name:'Bimlesh Tiwari'
    })
})

app.get('/weather', (req, res)=>{
    if(!req.query.address){
        return res.send({
            error:'Please provide a valid address'
        })
    }

    geocode(req.query.address, (error, {latitude,longitude,location}={})=>{
        if(error){
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastdata) => {
            if(error){
                return res.send({
                    error:error
                })
            }
            res.send({
                forecastdata: forecastdata,
                location,
                address: req.query.address,
            });
        })
    })
})

app.get('/products', (req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'You must provide a search term'
        })
    }

    res.send({
        product:[]
    })
})
app.get('/help/*', (req, res)=>{
    res.render('404',{
        title:'Error Page',
        errorText : 'Help article not found',
        name:'Bimlesh'
    });
})
app.get('*', (req, res)=>{
    res.render('404',{
        title:'Error Page',
        errorText : 'Page not found',
        name:'Bimlesh'
    });
})

app.listen(port, () => {
    console.log('Server is running at port ' + port);
}) 