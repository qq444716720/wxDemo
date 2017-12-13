require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import CardItem from './CardItem.js'


let weekImage = require('../images/week.png');
let clockImage = require('../images/time_20171205143720.png');
let rightImage = require('../images/right.png');


class AppComponent extends React.Component {

    constructor() {
        super();
        this.state = {
           
        }

    }


    componentDidMount() {
		
    }

    
    render() {
        return (
            <div>
	            {/* top img S*/}
	            <div className="topimg">
	            	<img src={weekImage} />
	            </div>
	            {/* top img E*/}

	        	{/* card S*/}
	            <div className="card">
					<CardItem />
					<CardItem />
					<CardItem />
	            </div>
	            {/* card E*/}
      		</div>
        );
    }
}

AppComponent.defaultProps = {
};

export default AppComponent;
