import React from 'react';
import PropTypes from 'prop-types';


const NoItems = ({ noItemsText }) => (
  <h3 className="md-block-centered md-text-center">{noItemsText}</h3>
);


NoItems.defaultProps = {
  noItemsText: 'No items',
};


NoItems.propTypes = {
  noItemsText: PropTypes.string,
};


export default NoItems;
