import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { Meteor } from 'meteor/meteor';

import { Col } from 'react-flexbox-grid';

import Card from 'react-md/lib/Cards/Card';
import CardTitle from 'react-md/lib/Cards/CardTitle';
import CardActions from 'react-md/lib/Cards/CardActions';
import Button from 'react-md/lib/Buttons/Button';
import Checkbox from 'react-md/lib/SelectionControls/Checkbox';

import LinkButton from '../LinkButton';


const getCheckboxId = poll => `checkbox-${poll._id}`;

const getHumanizeDuration = date => moment.duration(new Date() - date).humanize();

const getTimeAgo = date => `${getHumanizeDuration(date)} ago`;


const PollItem = ({ poll, onPublicityToggle }) => {
  const onPublicityToggleHandler = isChecked => onPublicityToggle(isChecked, poll._id);

  const canEditPoll = poll.createdBy === Meteor.userId();

  return (
    <Col xs={12} className="m-b-20">
      <Card>
        <CardTitle
          title={poll.title}
          subtitle={getTimeAgo(poll.createdAt)}
        />

        <CardActions>
          <LinkButton flat label="Open" to={`/poll/${poll._id}`}/>

          {canEditPoll && (
            <LinkButton
              flat
              to={`/edit-poll/${poll._id}`}
              label="Edit"
            />
          )}

          {canEditPoll && (
            <Checkbox
              id={getCheckboxId(poll)}
              name={getCheckboxId(poll)}
              label="public"
              checked={poll.isPublic}
              checkedIconChildren="check"
              onChange={onPublicityToggleHandler}
            />
          )}
        </CardActions>
      </Card>
    </Col>
  );
};


PollItem.defaultProps = {
  onPublicityToggle: () => true,
};


PollItem.propTypes = {
  poll: PropTypes.object.isRequired,

  onPublicityToggle: PropTypes.func,
};


export default PollItem;
