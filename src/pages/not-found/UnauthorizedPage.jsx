import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';

function UnauthorizedPage() {
  return (
    <div className="screen-shell notfound-page">
      <div className="card notfound-card">
        <h1>Unauthorized</h1>
        <p>You do not have access to view this page. Please sign in to continue.</p>
        <Link to={ROUTES.login} className="primary-button">
          Sign in
        </Link>
      </div>
    </div>
  );
}

export default UnauthorizedPage;
