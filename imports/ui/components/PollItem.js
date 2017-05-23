import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { Col } from 'react-flexbox-grid';

import Card from 'react-md/lib/Cards/Card';
import CardTitle from 'react-md/lib/Cards/CardTitle';
import CardActions from 'react-md/lib/Cards/CardActions';
import Button from 'react-md/lib/Buttons/Button';
import Checkbox from 'react-md/lib/SelectionControls/Checkbox';


const getCheckboxId = poll => `checkbox-${poll._id}`;

const getHumanizeDuration = date => moment.duration(new Date() - date).humanize();

const getTimeAgo = date => `${getHumanizeDuration(date)} ago`;


const PollItem = ({ poll }) => (
  <Col xs={12} className="m-b-20">
    <Card>
      <CardTitle
        title={poll.title}
        subtitle={getTimeAgo(poll.createdAt)}
      />

      <CardActions>
        <Button flat label="Open" />
        <Button flat label="Edit" />

        <Checkbox
          id={getCheckboxId(poll)}
          name={getCheckboxId(poll)}
          label="public"
          defaultChecked={poll.isPublic}
          checkedIconChildren="check"
        />
      </CardActions>
    </Card>
  </Col>
);


PollItem.propTypes = {
  poll: PropTypes.object.isRequired,
};


export default PollItem;
