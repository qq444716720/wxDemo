import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Bundle from './Bundle';

import Index from './Index';
import ProducttDetail from './common/ProducttDetail';
import CalendarPrice from './common/CalendarPrice';
import SubmitRouteOrder from './route/SubmitRouteOrder';
// import SelectContact from './member/SelectContact';

import SelectContact from './member/SelectContact';

import UpdateContact from './member/UpdateContact';
import SelectTourist from './member/SelectTourist';
import UpdateTourist from './member/UpdateTourist';
const Loading = function () {
    return <div>Loading...</div>
};

const createComponent = (component) =>() => (
    <Bundle load={component}>
        {
            (Component) => Component?<Component />:<Loading/>
        }
    </Bundle>
);


class AppComponent extends React.Component {

    
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/" component={Index} />
                    <Route path="/producttDetail/:goodsPromotionId/:goodsType/:goodsId" component={ProducttDetail} />
                    <Route path="/orderRoute/:goodsPromotionId/:priceDate" component={SubmitRouteOrder} />
                    <Route path="/calendarPrice/:goodsPromotionId" component={CalendarPrice} />
                    <Route path="/selectContact" component={SelectContact} />
                    <Route path="/updateContact/:type" component={UpdateContact} />
                    <Route path="/selectTourist" component={SelectTourist} />
                    <Route path="/updateTourist/:type" component={UpdateTourist} />
                </Switch>
            </Router>
        )
    }
}

AppComponent.defaultProps = {
};

export default AppComponent;
