import React from 'react';

import { Meteor } from 'meteor/meteor';

import { handleResult } from '../../utils/handle-result';

import { Row, Col } from 'react-flexbox-grid';

import TextField from 'react-md/lib/TextFields';
import Button from 'react-md/lib/Buttons';
import FocusContainer from 'react-md/lib/Helpers/FocusContainer';


const getFieldValue = form => field => form[field].value || '';


class SignInPage extends React.Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();

    const getFormFieldValue = getFieldValue(event.target);

    const email = getFormFieldValue('email');
    const password = getFormFieldValue('password');

    Meteor.loginWithPassword({ email }, password, handleResult());
  }

  render() {
    return (
      <div>
        <h1 className="text-center m-t-10">Sign In</h1>

        <Row>
          <Col xs={12} md={6} mdOffset={3} sm={8} smOffset={2}>
            <FocusContainer
              focusOnMount
              component="form"
              className="md-grid"
              onSubmit={this.onSubmit}
            >
              <TextField required id="email" type="email" label="Email" />

              <TextField required id="password" label="Password" type="password" />

              <Button raised primary type="submit" label="Submit" />
            </FocusContainer>
          </Col>
        </Row>
      </div>
    );
  }
}


export default SignInPage;
