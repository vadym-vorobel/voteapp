import React from 'react';
import PropTypes from 'prop-types';

import Link from 'react-router/lib/Link';
import Button from 'react-md/lib/Buttons';


class NavButton extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      to,
      label,
      flat,
      raised,
      icon,
      iconName,
      className,
    } = this.props;

    return (
      <Link to={to} style={{ color: '#fff' }}>
        <Button
          flat={flat}
          raised={raised}
          icon={icon}
          label={label}
          type="button"
          className={className}
        >{iconName}</Button>
      </Link>
    );
  }
}


NavButton.defaultProps = {
  flat: false,
  raised: false,
  icon: false,
  iconName: '',
  label: '',
  className: '',
};


NavButton.propTypes = {
  to: PropTypes.string.isRequired,

  className: PropTypes.string,
  label: PropTypes.string,
  flat: PropTypes.bool,
  raised: PropTypes.bool,
  icon: PropTypes.bool,
  iconName: PropTypes.string,
};


export default NavButton;
