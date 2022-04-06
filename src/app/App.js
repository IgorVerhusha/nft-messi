import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import {
  ThemeProvider,
  CssBaseline
} from '@material-ui/core';

import Theme from "./Theme";
import AppRoutes from "./AppRoutes";
import Content from "../common/Content";
import DataService from '../services/DataService';
import { AuthContextProvider } from '../services/AuthService';
import { NotificationContextProvider } from '../services/NotificationService';
import { AppContextProvider } from '../services/AppService';
import './fonts.css';
import './App.css';


const App = () => {

  // Init Data Service
  DataService.Init();

  // Build App
  let view = (
    <React.Fragment>
      <ThemeProvider theme={Theme}>
        <CssBaseline />
        <AuthContextProvider>
          <NotificationContextProvider>
            <AppContextProvider>
              <Router basename="/">
                <Content>
                  <AppRoutes />
                </Content>
              </Router>
            </AppContextProvider>
          </NotificationContextProvider>
        </AuthContextProvider>
      </ThemeProvider>
    </React.Fragment>
  )

  // Return View
  return view
}

export default App;
