import React from 'react';
import CardItem from './CardItem.js';
var styles = require('styles/Index.css');

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
	            <div className={styles.topimg}>
	            	<img src={weekImage} />
	            </div>
	            {/* top img E*/}

	        	{/* card S*/}
	            <div className={styles.card}>
					<CardItem time="2017-12-14 10:00:00"/>
					<CardItem time="2017-12-15 00:00:00" />
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
