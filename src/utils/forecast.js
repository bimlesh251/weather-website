
const request = require('request')
const forecast = (lat, long, callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=d9b61d09f6473f0b3e4261b81255b7c2&query=' + lat + ',' + long;
    request({url, json:true}, (error, {body})=>{
        if(error){
             callback('unable to connect to weather stack service',undefined)
        }else if(body.success === false){
            callback('weather location not found. Try with another location',undefined)
        }else{
            callback(undefined,'It is currently '+body.current.temperature+ ' degrees out. It is feels like '+body.current.feelslike)
        }
    })    
}
module.exports = forecast
