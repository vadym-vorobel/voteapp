import React from 'react';
import PropTypes from 'prop-types';

import FontIcon from 'react-md/lib/FontIcons/FontIcon';


const RemoveIcon = ({ onRemove, className }) => (
  <FontIcon
    onClick={onRemove}
    className={`pointer ${className}`}
  >
    delete
  </FontIcon>
);


RemoveIcon.defaultProps = {
  className: '',
};


RemoveIcon.propTypes = {
  onRemove: PropTypes.func.isRequired,
  className: PropTypes.string,
};


export default RemoveIcon;
