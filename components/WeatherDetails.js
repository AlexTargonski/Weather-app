import React     from 'react';
import PropTypes from 'prop-types';

const WeatherDetails = ({
  temperature,
  weather,
  pressure,
  system,
}) => (
  <>
    <div className="card-wrapper">
      <p>temperature: {`${temperature}${system === 'metric'? '\u2103' : '\u2109'}`}</p>
      <p>pressure: {pressure}</p>
      {
        weather.map(w =>
          <div key={w.id}>
            <p>{w.main}</p>
            <p>{w.description}</p>
          </div>
        )
      }
    </div>
    <style jsx>{`
      .card-wrapper {
        background    : rgba(45, 48, 88, 0.3);
        padding       : 3.5em;
        border-radius : 30px;
        color         : #ffff;
      }
    `}
    </style>
  </>
);

WeatherDetails.propTypes = {
  temperature : PropTypes.number.isRequired,
  weather     : PropTypes.number.isRequired,
  pressure    : PropTypes.array.isRequired,
  system      : PropTypes.string.isRequired,
};

export default WeatherDetails;
