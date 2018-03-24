import { Migrations } from 'meteor/percolate:migrations';

import { Polls } from '../../imports/api/polls/polls';

Migrations.add({
  version: 1,
  name: 'Remove all polls with an empty title',
  up() {
    Polls.remove({ title: '' });
  },
});
