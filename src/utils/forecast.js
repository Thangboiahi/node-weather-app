const request = require("postman-request");

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=83d706bdf072cd225d0936cead945724&query=${latitude},${longitude}&units=m`;

  request({
    url,
    json: true
  }, (error, {body}) => {
    if (error) {
      callback("Unable to connect to weatherstack!", undefined);
    } else if (body.error) {
      callback(body.error.info, undefined);
    } else {
      callback(undefined, `The temperature is ${body.current.temperature} and it feels like ${body.current.feelslike}`);
    }
  });
};

module.exports = forecast;