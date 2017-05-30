import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';


import Voting from './Voting/Voting';


export default createContainer(() => {

  return {
    loading: false,
    onUnmount: () => true,
    questions: [],
  };
}, Voting);
