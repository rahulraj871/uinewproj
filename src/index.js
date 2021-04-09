import React from 'react';
import {render} from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import App from './containers/App';
import { ThemeProvider } from "@material-ui/styles";
import {BrowserRouter} from 'react-router-dom';
import Themes from "./themes";
// import 'bootstrap/dist/css/bootstrap.min.css';  
const app = (
  <ThemeProvider theme={Themes.default}>
      <BrowserRouter>       
          <App />
      </BrowserRouter>
      </ThemeProvider>
);
render(  
  app,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
