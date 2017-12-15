import React from 'react';
import CardItem from './CardItem.js';
require('styles/Index.css');

let weekImage = require('../images/week.png');


class Index extends React.Component {

    constructor() {
        super();
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
					<CardItem time="2017-12-17 10:00:00"/>
					<CardItem time="2017-12-16 09:36:00" />
					<CardItem time="2017-12-18 00:00:00" />
	            </div>
	            {/* card E*/}
      		</div>
        );
    }
}

Index.defaultProps = {
};

export default Index;
