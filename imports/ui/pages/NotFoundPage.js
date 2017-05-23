import React from 'react';

import { Link } from 'react-router';
import Button from 'react-md/lib/Buttons/Button';


const NotFoundPage = () => (
  <div className="md-text-center">
    <h1>Page not found!</h1>

    <Link to="/">
      <Button primary raised label="Go Home" />
    </Link>
  </div>
);

export default NotFoundPage;
