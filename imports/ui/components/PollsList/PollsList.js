import React from 'react';
import PropTypes from 'prop-types';

import { Row } from 'react-flexbox-grid';

import { handleResult } from '../../../utils/client-utils';
import { createPoll, updatePoll } from '../../../api/polls/methods';

import PollItem from './PollItem';
import Spinner from '../Spinner';
import LinkButton from '../LinkButton';
import NoItems from '../NoItems';


class MyPolls extends React.Component {
  constructor(props) {
    super(props);

    this.onPublicityToggle = this.onPublicityToggle.bind(this);
    this.createPoll = this.createPoll.bind(this);
  }

  componentWillUnmount() {
    this.props.onUnmount();
  }

  onPublicityToggle(isPublic, pollId) {
    updatePoll.call({ _id: pollId, partToUpdate: { isPublic } }, handleResult());
  }

  createPoll(event) {
    event.preventDefault();

    createPoll.call({ poll: {} }, handleResult((pollId) => {
      this.context.router.push(`edit-poll/${pollId}`);
    }));
  }

  render() {
    const { loading, polls } = this.props;

    return (
      <Spinner loading={loading}>
        <Row>
          {!loading && polls.length === 0 && <NoItems />}

          {polls.length > 0 && polls.map(poll => (
            <PollItem
              key={poll._id}
              poll={poll}
              onPublicityToggle={this.onPublicityToggle}
            />
          ))}
        </Row>

        <LinkButton floating fixed primary onClick={this.createPoll}>add</LinkButton>
      </Spinner>
    );
  }
}


MyPolls.propTypes = {
  loading: PropTypes.bool.isRequired,
  polls: PropTypes.array.isRequired,
  onUnmount: PropTypes.func.isRequired,
};


MyPolls.contextTypes = {
  router: PropTypes.object.isRequired,
};


export default MyPolls;
