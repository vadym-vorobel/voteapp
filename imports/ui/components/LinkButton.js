import React from 'react';
import PropTypes from 'prop-types';

import Link from 'react-router/lib/Link';
import Button from 'react-md/lib/Buttons/Button';


const LinkButton = ({ to, children, ...buttonProps }) => (
  <Link to={to} style={{ color: '#fff' }}>
    {children && (
      <Button
        {...buttonProps}
      >
        {children}
      </Button>
    )}

    {!children && <Button {...buttonProps} />}
  </Link>
);


LinkButton.defaultProps = {
  to: '/',
  ...Button.defaultProps,
};


LinkButton.propTypes = {
  to: PropTypes.string,
  ...Button.propTypes,
};


export default LinkButton;
