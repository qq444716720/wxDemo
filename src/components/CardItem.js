import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Timing from './Timing.js';


let rightImage = require('../images/right.png');


class CardItem extends React.Component {

    constructor() {
        super();
    }


    componentDidMount() {

    }


    render() {
        return (
            <div>
				<div className="card-item">
					<div className="card-title">
						<span>武汉武汉武汉武汉武汉武汉汉</span>
						<span><i>4</i>日游</span>
					</div>
					<div className="card-right">
						<img src={rightImage} alt=""/>
					</div>
					<div className="card-price">
						<s>原价：￥2265</s>
						<span>限时抢购：￥2980</span>
					</div>
					<div className="card-btn">
				      	<Link to='detail'><button>去秒杀</button></Link>
						<div className="card-stock">
							<span>仅剩42份:</span>
							<div className="bar">
								<div className="bar-used"></div>
							</div>
						</div>
						<div className="card-time">
							<Timing time="2017-12-18 00:00:00" />
						</div>
					</div>
            	</div>
      		</div>
        );
    }
}

CardItem.defaultProps = {
};

export default CardItem;
