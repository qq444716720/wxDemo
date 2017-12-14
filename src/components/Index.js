import React from 'react';
import CardItem from './CardItem.js';

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
					<CardItem />
					<CardItem />
					<CardItem />
	            </div>
	            {/* card E*/}
      		</div>
        );
    }
}

Index.defaultProps = {
};

export default Index;
