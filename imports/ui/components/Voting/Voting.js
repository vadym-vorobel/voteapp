import React from 'react';
import PropTypes from 'prop-types';

import Spinner from '../Spinner';


class Voting extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        Voting will be here
      </div>
    );
  }
}


Voting.propTypes = {
  pollId: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  onUnmount: PropTypes.func.isRequired,
  questions: PropTypes.array.isRequired,
};


export default Voting;
