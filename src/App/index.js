import React from 'react';
import PropTypes from 'prop-types';
import { MuiThemeProvider, getMuiTheme } from 'material-ui/styles';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import { AppBar } from 'material-ui';

const App = ({ children }) => (
  <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)} >
    <div>
      <AppBar title="React Boilerplate" />
      {children}
    </div>
  </MuiThemeProvider>
);

App.propTypes = {
  children: PropTypes.objectOf(PropTypes.any),
};

export default App;
