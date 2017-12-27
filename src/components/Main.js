import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Index from './Index.js';
import ProductDetail from './ProductDetail.js';


class AppComponent extends React.Component {


    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/" component={Index} />
                    <Route path="/detail" component={ProductDetail} />
                </Switch>
            </Router>
        )
    }
}

AppComponent.defaultProps = {
};

export default AppComponent;
