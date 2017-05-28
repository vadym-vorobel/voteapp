import React from 'react';
import PropTypes from 'prop-types';

import PollContainer from '../components/Poll/PollContainer';


const PollPage = ({ params: { _id } }) => (
  <PollContainer pollId={_id} />
);


PollPage.propTypes = {
  params: PropTypes.object.isRequired,
};


export default PollPage;
