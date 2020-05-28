import * as React from 'react';

export class AboutPage extends React.Component {
  render(): React.ReactElement {
    return (
      <div id="image">
        <div className="container" id="search">
          <h2>About</h2>
          <p>
            This app uses React, Redux, React Router, and many other helpful libraries.
                </p>
        </div>
      </div>
    )
  }
}