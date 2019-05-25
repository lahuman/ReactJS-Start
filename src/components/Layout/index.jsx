import React from 'react';
import { Link } from 'react-router-dom';
const Layout = ({ children }) => {
  return (
    <React.Fragment>
      <Link to="/">
        <h1>Example Layout</h1>
      </Link>
      <Link to="/name">
        <h1>name</h1>
      </Link>
      {children}
    </React.Fragment>
  );
};
export default Layout;