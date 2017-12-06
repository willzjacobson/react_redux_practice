import React from 'react';
import { Link } from 'react-router';

// This could be a stateless functional component, but we make it a class for the sake of hot reloading (requires classes)
class AboutPage extends React.Component {
  render() {
    return (
      <div>
        <h1>About</h1>
        <p>This application uses React, Redux, React Router and a variety of other helpful libraries.</p>
      </div>
    );
  }
}

export default AboutPage;
