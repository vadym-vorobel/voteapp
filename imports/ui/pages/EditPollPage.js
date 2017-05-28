import React from 'react';
import PropTypes from 'prop-types';

import EditPollContainer from '../components/EditPoll/EditPollContainer';


const EditPollPage = ({ params: { _id } }) => (
  <div>
    <h1 className="md-text-center">Edit Poll</h1>

    <EditPollContainer pollId={_id} />
  </div>
);


EditPollPage.propTypes = {
  params: PropTypes.object.isRequired,
};


export default EditPollPage;
