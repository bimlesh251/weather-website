const request = require('request')

const geocode = (address, cb)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiYmltbGVzaDI1IiwiYSI6ImNrYTZ1a21jZzAzc3Iyc28wMDMxZTl5dDcifQ.FAgPTQNyR--Wr9N2W4rFmg&limit=1';
    request({url, json:true}, (error, {body})=>{
        if(error){
            cb('Unable to connect to map box service!', undefined)
        }else if(body.features.length===0){
            cb('Location not found. Try another search', undefined)
        }
        else{
            cb(undefined, {
                latitude : body.features[0].center[1],
                longitude : body.features[0].center[0],
                location : body.features[0].place_name
            })
        }        
    })
}
module.exports = geocode