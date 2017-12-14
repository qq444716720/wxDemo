import React from 'react';
import { Link } from 'react-router-dom';
import Timing from './Timing.js';

var styles = require('styles/CardItem.css');
let rightImage = require('../images/right.png');
let endrightImage = require('../images/endright.png');


class CardItem extends React.Component {

    constructor() {
        super();
        this.state = {
        	timeoutFlg: true
        }
    }


    componentDidMount() {

    }

    handleTime() {
    	this.setState({
    		timeoutFlg: false
        });
    }

    render() {

        return (
            <div>
				<div className={styles['card-item']}>
					<div className={styles['card-title']}>
						<span>武汉武汉武汉武汉武汉武汉汉</span>
						<span><i>4</i>日游</span>
					</div>
					<div className={styles['card-right']}>
						<img src={
									this.state.timeoutFlg
									?
									this.state.rightImage
									:
									this.state.endrightImage
								} alt=""/>
					</div>
					<div className={styles['card-price']}>
						<s>原价：￥2265</s>
						<span>限时抢购：￥2980</span>
					</div>
					<div className={styles['card-btn']}>
						{
							this.state.timeoutFlg
							?
							<Link to='detail'><button>去秒杀</button></Link>
							:
							<button className={styles.timeoutBut}>已结束</button>
						}
						<div className={styles['card-stock']}>
							<span>仅剩42份:</span>
							<div className={styles.bar}>
								{
									this.state.timeoutFlg
									?
									<div className={styles['bar-used']}></div>
									:
									''
								}
							</div>
						</div>
						<div className={styles['card-time']}>
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
