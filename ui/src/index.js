import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import getRouteByPath from "routes"

import 'bootstrap/dist/css/bootstrap.min.css';



const Router = ({component: Component, ...rest}) => {
    const route = getRouteByPath(rest.location.pathname);

    return (<Route {...rest} render={(props) => (<route.layout {...props} view={route.view} />)}/>)
}

ReactDOM.render(
  <React.StrictMode>
      <BrowserRouter>
            <Switch>
                <Route path="/" component={Router} />
            </Switch>
      </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);