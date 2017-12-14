require('normalize.css/normalize.css');

import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ProductDetail from './ProductDetail.js';


class AppComponent extends React.Component {


    render() {
        return (
            <Router>
            	<div>
            		<Route exact path="/" component={Index} />
            		<Route path="/detail" component={ProductDetail} />
            	</div>
            </Router>
        )
    }
}

AppComponent.defaultProps = {
};

export default AppComponent;
