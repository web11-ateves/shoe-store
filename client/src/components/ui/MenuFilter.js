import React from 'react';
import PropTypes from 'prop-types';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';

const MenuFilter = ({
  query, placeholder, onChange,
}) => (
  <div className="search">
    <div className="search-icon">
      <SearchIcon />
    </div>
    <InputBase
      placeholder={placeholder}
      inputProps={{ 'aria-label': 'search' }}
      className="input-root"
      value={query}
      onChange={onChange}
    />
  </div>
);

MenuFilter.propTypes = {
  query: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

MenuFilter.defaultProps = {
  query: '',
};

export default MenuFilter;
