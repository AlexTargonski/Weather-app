import { useState, useEffect } from 'react';
import fetch                   from 'isomorphic-unfetch';
import Head                    from "next/head";

import WeatherDetails          from '../components/WeatherDetails';

const Index = (props) => {
  const [city, setCity] = useState('London');
  const [weatherData, setWeatherData] = useState({});
  const [systemOfMeasurement, setSystemOfMeasurement] = useState('metric')

  useEffect(() => {
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=8abe72efb075fa3a95fd38c8a53f12c8&units=${systemOfMeasurement}`)
      .then(res => res.json())
      .then(json => setWeatherData(json))
      .catch(err => console.log(err));
  }, [city, systemOfMeasurement]);

  return(
    <>
      <Head>
        <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet" />
      </Head>
      <div className="form-control">
        <input onChange={e => setCity(e.target.value)} />
      </div>
      <h2>System Of Measurement:</h2>
      <div className="form-control">
        <button
          onClick={() => setSystemOfMeasurement('imperial')}
          disabled={systemOfMeasurement === 'imperial'? true : false}
        >
          Imperial
        </button>
        <button
          onClick={() => setSystemOfMeasurement('metric')}
          disabled={systemOfMeasurement === 'metric'? true : false}
        >
          Metric
        </button>
      </div>
      <h1>{city}</h1>
      {
        (weatherData && weatherData.cod == 200)?
        <WeatherDetails
          temperature={weatherData.main.temp}
          pressure={weatherData.main.pressure}
          weather={weatherData.weather}
          system={systemOfMeasurement}
        />
        :
        null
      }
      <style global jsx>
        {`
          body {
            padding     : 0;
            margin      : 0;
            font-family : 'Nunito', sans-serif;
          }

          h1 {
            font-size : 55px;
          }

          h2 {
            text-align : center;
          }

          p {
            font-size : 30px;
          }
        `}
      </style>
      <style jsx>
        {`
          input {
            border        : 2px #20262c solid;
            border-radius : 100px;
            height        : 15px;
            width         : 400px;
            padding       : 18px;
            font-size     : 25px;
          }

          button {
            height    : 75px;
            width     : 120px;
            font-size : 24px;
          }

          .form-control {
            width           : 96%;
            display         : flex;
            justify-content : center;
            padding         : 2%;
          }
        `}
      </style>
    </>
  )
};

export default Index
