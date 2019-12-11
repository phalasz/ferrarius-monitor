import React from 'react';
import { Typography } from '@material-ui/core';

export class Ferrarius extends React.Component {

  render() {
    console.log(this.props);
    return (
      <div>
        <Typography component="h2" variant="h6" color="inherit" noWrap>Ferrarius</Typography>
        <Typography variant="body1">
          <p>/ferˈraː.ri.us/, [fɛrˈraː.ri.ʊs]</p>
          <p>
            Latin noun for blacksmith.
          </p>
        </Typography>
      </div>
    );
  }
}
