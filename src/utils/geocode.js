const request = require("postman-request");

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiZGR0aGFuZyIsImEiOiJja2F0bG0zZWEwMmV2MnNsZmh4a3B5azkyIn0.d82NOP9Gk5TAX9n7lPHIfQ&limit=1`;
  
  request({
    url,
    json: true
  }, (error, {body}) => {
    if (error) {
      callback("Unable to connect to location services!", undefined);
    } else if (!body.features) {
      callback("Unable to find location, try another location search!", undefined)
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name
      });
    }
  });
};

module.exports = geocode;