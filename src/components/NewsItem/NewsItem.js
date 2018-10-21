import './NewsItem.styl';

import React from 'react';
import PropTypes from 'prop-types';

const NewsItem = ({
  headline,
  snippet,
  image,
  isActive,
  onClick,
  id
}) => (
  <div
    className={`c-news-item${ isActive ? ' active' : '' }`}
    onClick={() => { onClick(id, isActive); }}
  >
    <div className="item-media">
      <div className="image-wrapper">
        <img src={image} alt="" />
      </div>
    </div>
    <div className="item-body">
      <h3 className="item-title">
        {headline}
      </h3>
      <p className="item-description">
        {snippet}
      </p>
    </div>
  </div>
);

NewsItem.displayName = 'NewsItem';

NewsItem.propTypes = {
  headline: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  snippet: PropTypes.string,
  image: PropTypes.string,
  isActive: PropTypes.bool
};

export default NewsItem;
