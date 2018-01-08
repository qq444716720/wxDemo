import React from 'react';
import { Link } from 'react-router-dom';
import Timing from './Timing';
import NoTiming from './NoTiming';
require('styles/common/CardItem.css');
let rightImage = require('../../images/right.png');
let rightImage2 = require('../../images/right2.png');
let endrightImage = require('../../images/endright.png');


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

	handleNoTime() {

	}

	render() {
		let { goodsPromotionId, goodsType, goodsId, promotionName, promotionOldPrice, promotionPrice, promotionCount, surplusPromotion, promotionFromDate, promotionToDate } = this.props.item;
		let img = rightImage2;
		if(new Date(promotionFromDate) < new Date() ){
			img = rightImage;
		}
		return (
			<div>
				<div className="card-item">
					<div className="card-title">
						<span dangerouslySetInnerHTML={{__html: `${promotionName}`}}></span>
						{/* <span><i>4</i>日游</span> */}
					</div>
					<div className="card-right">
						<img src={
							this.state.timeoutFlg
								?
								img
								:
								endrightImage
						} alt="" />
					</div>
					<div className="card-price">
						<s>原价：￥{promotionOldPrice}</s>
						{
							new Date(promotionFromDate) < new Date()
							?
							<span>限时抢购：￥{promotionPrice}</span>
							:
							<span style={{color: '#6adadb'}}>限时抢购：￥{promotionPrice}</span>
						}
						
					</div>
					<div className="card-btn">
						{
							this.state.timeoutFlg
								?
								<div>
									{
										new Date(promotionFromDate) < new Date()
										?
										<Link to={'/producttDetail/'+goodsPromotionId+'/'+goodsType+'/'+goodsId}><button className="btn-y">去秒杀</button></Link>
										:
										<button className="btn-n">即将开始</button>
									}
								</div>
								:
								<button className="timeoutBut">已结束</button>
						}
						<div className="card-stock">
							{
								new Date(promotionFromDate) < new Date()
								?
								<div>
									<span>仅剩{surplusPromotion}份:</span>
									<div className="bar">
										{
											this.state.timeoutFlg
												?
												<div className="bar-used" style={{width:`${surplusPromotion/promotionCount*100}%`}}></div>
												:
												''
										}
									</div>
								</div>
								:
								<div>
									<span style={{color: '#6adadb'}}>仅剩{surplusPromotion}份:</span>
									<div className="bar">
										{
											this.state.timeoutFlg
												?
												<div className="bar-used" style={{background: '#6adadb',width:`${surplusPromotion/promotionCount*100}%`}}></div>
												:
												''
										}
									</div>
								</div>
							}
							
						</div>
						<div className="card-time">
							{
								new Date(promotionFromDate) < new Date()
								?
								<Timing handleTime={this.handleTime.bind(this)} time={promotionToDate} />
								:
								<NoTiming handleNoTime={this.handleNoTime.bind(this)} time={promotionFromDate} />
							}
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
