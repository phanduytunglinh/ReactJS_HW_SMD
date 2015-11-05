var isNode = typeof module !== 'undefined' && module.exports
  , React = isNode ? require('react') : window.React
  , ReactDOM = isNode ? require('react') : window.ReactDOM
  
var WeatherInfo = React.createClass({
  render: function() {
    return (<div id='weather'>
                <p> Location : {this.state.data.name} </p>
                <p> Time : {this.state.time} </p>
                <p> Main weather: {this.state.data.weather[0].main} </p>
                <button type="button" onClick={this.loadWeatherInfo}> Update </button> 
            </div>);
  },
  getInitialState: function () {
    return this.props;
  },
  loadWeatherInfo: function(){
    $.ajax({
      url: "http://api.openweathermap.org/data/2.5/weather?id=1905468&appid=22b7b7f78eab22808d6f2409d9c05ada",
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data, time : new Date().toString()});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  }
});

if (isNode) {
    exports.WeatherInfo = WeatherInfo;
} else {
    var initData = JSON.parse(document.getElementById("initData").innerHTML);
    var container = document.getElementById('content');
    ReactDOM.render(React.createElement(WeatherInfo, initData), container);
}
