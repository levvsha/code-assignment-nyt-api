import './SearchField.styl';

import React from 'react';
import PropTypes from 'prop-types';

import SearchIcon from '../../../images/search-icon.svg';

const SearchField = ({ value, onChange, onKeyDown }) => (
  <div className="c-search-field loading">
    <input
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      className="search-input"
      placeholder="Search..."
    />
    <SearchIcon width="20" />
  </div>
);

SearchField.displayName = 'SearchField';

SearchField.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func.isRequired,
};

export default SearchField;
