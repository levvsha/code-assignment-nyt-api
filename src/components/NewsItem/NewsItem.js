import './NewsItem.styl';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _debounce from 'lodash.debounce';

export default class NewsItem extends Component {
  static propTypes = {
    headline: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    snippet: PropTypes.string,
    image: PropTypes.string,
    isActive: PropTypes.bool,
    publicationDate: PropTypes.string,
    link: PropTypes.string
  };

  state = {
    expandedImageHeight: null
  }

  constructor() {
    super();

    this.debouncedHandleResize = _debounce(this.handleResize, 350);
  }

  componentDidMount() {
    window.addEventListener('resize', this.debouncedHandleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.debouncedHandleResize);
  }

  handleResize = () => {
    const imageHeight = this.image && this.image.getBoundingClientRect().height;

    this.setState({ expandedImageHeight: imageHeight });
  }

  handleClick = () => {
    if (!this.props.isActive) {
      const imageHeight = this.image && this.image.getBoundingClientRect().height;

      this.setState({ expandedImageHeight: imageHeight });
    }

    this.props.onClick(this.props.id);
  }

  render() {
    const {
      headline,
      snippet,
      image,
      isActive,
      publicationDate,
      link,
    } = this.props;

    const { expandedImageHeight } = this.state;

    return (
      <div
        className={`c-news-item${ isActive ? ' active' : '' }`}
        onClick={this.handleClick}
      >
        <div
          className="item-media"
          style={isActive && expandedImageHeight ? { minHeight: `${ expandedImageHeight }px` } : null}
        >
          <div className="image-wrapper">
            <img ref={image => (this.image = image)} src={image} alt="" />
          </div>
        </div>
        <div className="item-body">
          <h3 className="item-title">
            {headline}
          </h3>

          <div className="item-description">
            <p className="item-published">
              Publisherd: {publicationDate}
            </p>
            <p className="item-snippet">
              {snippet}
            </p>
            <p className="read-more">
              <a
                target="_blank"
                href={link}
              >
                Read more
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  }
}
