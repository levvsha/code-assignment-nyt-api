/* Preloader from http://tobiasahlin.com/spinkit/ by @tobiasahlin */
import './Preloader.styl';

import React from 'react';
import PropTypes from 'prop-types';

const Preloader = ({ color }) => (
  <div className="c-preloader">
    <div className="spinner">
      <div className="bounce1" style={ color ? { backgroundColor: color } : null } />
      <div className="bounce2" style={ color ? { backgroundColor: color } : null } />
      <div className="bounce3" style={ color ? { backgroundColor: color } : null } />
    </div>
  </div>
);

Preloader.displayName = 'Preloader';

Preloader.propTypes = {
  color: PropTypes.string
};

export default Preloader;
