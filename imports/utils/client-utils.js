import R from 'ramda';

import { showError } from './alerts';


export const handleResult = onSuccess => (error, result) => {
  if (error) {
    showError(error);
  } else if (R.is(Function, onSuccess)) {
    onSuccess(result);
  }
};
