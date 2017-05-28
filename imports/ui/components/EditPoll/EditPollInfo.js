import React from 'react';
import PropTypes from 'prop-types';

import Col from 'react-flexbox-grid/lib/components/Col';
import TextField from 'react-md/lib/TextFields/TextField';
import Checkbox from 'react-md/lib/SelectionControls/Checkbox';

import { colProps } from './props';


const getCheckboxId = poll => `checkbox-${poll._id}`;


const EditPollInfo = ({ poll, onPollUpdate}) => (
  <Col {...colProps}>
    <TextField
      id="poll-title"
      label="Poll Title"
      placeholder="My awesome poll"
      customSize="title"
      size={10}
      value={poll.title}
      onChange={onPollUpdate('title')}
    />

    <Checkbox
      id={getCheckboxId(poll)}
      name={getCheckboxId(poll)}
      label="public"
      checked={poll.isPublic}
      checkedIconChildren="check"
      onChange={onPollUpdate('isPublic')}
    />
  </Col>
);


EditPollInfo.propTypes = {
  poll: PropTypes.object.isRequired,
  onPollUpdate: PropTypes.func.isRequired,
};


export default EditPollInfo;
