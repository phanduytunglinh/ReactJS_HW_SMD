require('babel/register')

var express = require('express')
  , request = require('request')
  , app = express()
  , React = require('react')
  , ReactDOMServer = require('react-dom/server')
  , components = require('./public/components.js');

var WeatherInfo = React.createFactory(components.WeatherInfo);

app.engine('jade', require('jade').__express);
app.set('view engine', 'jade');

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
    request({
        url: "http://api.openweathermap.org/data/2.5/weather?id=1905468&appid=22b7b7f78eab22808d6f2409d9c05ada",
        json: true
    }, function (error, response, body) {
      if (!error && response.statusCode === 200) {
          var initData = {data : body, time : new Date().toString()},
              info = WeatherInfo(initData);
          res.render('./index', {content : ReactDOMServer.renderToString(info),
                                 initData : JSON.stringify(initData)});
      }
      else res.send('No internet connection.');
    })
});

app.listen(3000, function() {
  console.log('Listening on port 3000...')
});
