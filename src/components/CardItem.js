import React from 'react';
import { Link } from 'react-router-dom';
import Timing from './Timing.js';


let rightImage = require('../images/right.png');
let endrightImage = require('../images/endright.png');


class CardItem extends React.Component {

    constructor() {
        super();
        this.state = {
        	rightImage: rightImage,
        	linkButton: <Link to='detail'><button>去秒杀</button></Link>,
        	stock: <div className="bar-used"></div>
        }
    }


    componentDidMount() {

    }

    handleTime() {
    	this.setState({
        	rightImage: endrightImage,
        	linkButton: <button className='timeoutBut'>已结束</button>,
        	stock: ''
        });
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
						<img src={this.state.rightImage} alt=""/>
					</div>
					<div className="card-price">
						<s>原价：￥2265</s>
						<span>限时抢购：￥2980</span>
					</div>
					<div className="card-btn">
						{this.state.linkButton}
						<div className="card-stock">
							<span>仅剩42份:</span>
							<div className="bar">
								{this.state.stock}
							</div>
						</div>
						<div className="card-time">
							<Timing handleTime={this.handleTime.bind(this)} time={this.props.time} />
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
