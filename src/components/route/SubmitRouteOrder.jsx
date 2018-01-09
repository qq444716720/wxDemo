import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { Toast } from 'antd-mobile';
import Contact from '../member/Contact';
import Tourist from '../member/Tourist';
import 'antd-mobile/dist/antd-mobile.css';
require('styles/route/SubmitRouteOrder.scss');

class SubmitRouteOrder extends React.Component {

	constructor() {
		super();
		let childrenNum = parseInt(localStorage.getItem('childrenNum'));
		let adultNum = parseInt(localStorage.getItem('adultNum'));
		if(!childrenNum){
			childrenNum = 0;
		}
		if(!adultNum){
			adultNum = 2;
		}
		this.state = {
			adultNum: adultNum,
			childrenNum: childrenNum,
			adultPrice: 1500,
			adultPriceNew: 3000,
			childrenPrice: 500,
			childrenPriceNew: 0,
			singlePrice: 300,
			totalPrice: 3000,
			singlePriceNew: 0,
			date: moment(new Date()).format('YYYY-MM-DD'),
			goodsPromotionId: 0,
			promotionName: '',
			sold: 0,
			goodsId: ''
		}

	}

	componentDidMount() {
		Toast.loading('Loading...', 0, () => {
			console.log('Load complete !!!');
		});
		let { goodsPromotionId, priceDate } = this.props.match.params;
		if(priceDate == 0){
			priceDate = '';
		}
		
		fetch('http://192.168.70.238:8001/sale/promotion/promotion_getPromotionBaseInfo.do', {
			method: 'POST',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			body: 'goodsPromotionId=' + goodsPromotionId
		}).then(response => response.json()).then(json => {
			this.setState({
				sold: json.promotionBase.promotionCount - json.promotionBase.surplusPromotion,
				promotionName: json.promotionBase.promotionName,
				goodsId: json.promotionBase.goodsId
			});
			fetch('http://192.168.70.238:8001/sale/promotion/price_getPromotionPriceOne.do', {
				method: 'POST',
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
				body: 'goodsPromotionId=' + goodsPromotionId + '&priceDate=' + priceDate
			}).then(response => response.json()).then(json => {
				let adultNum = this.state.adultNum;
				let childrenNum = this.state.childrenNum;
				let singlePrice = 0;
				if(adultNum % 2 > 0){
					singlePrice = json.singleRoomPrice;
				}
				this.setState({
					adultPrice: json.promotionPrice,
					adultPriceNew: parseInt(json.promotionPrice)*parseInt(adultNum),
					totalPrice: parseInt(json.promotionPrice)*parseInt(adultNum)+parseInt(json.kidPrice)*parseInt(childrenNum)+singlePrice,
					childrenPrice: json.kidPrice,
					singlePrice: json.singleRoomPrice,
					singlePriceNew: singlePrice,
					date: moment(json.priceDate).format('YYYY-MM-DD'),
					goodsPromotionId: json.goodsPromotionId
				});
				Toast.hide();
			});
		});
	}

	handlerChange(e){
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	handleSubmit(){
		let selectChildrenNum = parseInt(localStorage.getItem('selectChildrenNum'));
		let selectAdultNum = parseInt(localStorage.getItem('selectAdultNum'));
		if(this.state.adultNum != selectAdultNum || this.state.childrenNum != selectChildrenNum){
			Toast.info(`请选择${this.state.adultNum}位成人${this.state.childrenNum}位儿童`, 2);
			return;
		}
		let contactsId = localStorage.getItem('selectedContactsId');
		let touristIds = localStorage.getItem('selectedTouristIds');
		fetch('http://rap.taobao.org/mockjs/30890/order/orderItemRoute_saveRouteOrder.do', {
			method: 'POST',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			body: 'adultNum=' + this.state.adultNum + '&childNum=' + this.state.childrenNum +
			'&useTime=' + this.state.date + '&contactsId=' + contactsId + '&touristString=' + touristIds
		}).then(response => response.json()).then(json => {
			Toast.hide();
			if(json.success){
				Toast.success(json.msg, 2);
				window.location.href = 'http://wx.yjylx.com/travelPayment/'+ json.orderItemId +'_4.html'
			}else {
				Toast.fail(json.msg, 2);
			}
		});
		
		// useTimeTmp=date
		// goodsRouteId=goodsId
	}

	addNum(type){
		if(type === 0){// 成人
			let adultNum = this.state.adultNum + 1;
			localStorage.setItem('adultNum', adultNum);
			this.setState({
				adultNum: adultNum,
				adultPriceNew: this.state.adultPrice*adultNum
			}, () => {
				// 总价
				let singlePrice = 0;
				if(this.state.adultNum % 2 > 0){
					singlePrice = this.state.singlePrice;
				}
				this.setState({
					totalPrice: this.state.adultPriceNew+singlePrice+this.state.childrenPriceNew,
					singlePriceNew: singlePrice
				});
			});
		}else {// 儿童
			let childrenNum = ++this.state.childrenNum;
			localStorage.setItem('childrenNum', childrenNum);
			this.setState({
				childrenNum: childrenNum,
				childrenPriceNew: this.state.childrenPrice*childrenNum
			}, () => {
				// 总价
				let singlePrice = 0;
				if(this.state.adultNum % 2 > 0){
					singlePrice = this.state.singlePrice;
				}
				this.setState({
					totalPrice: this.state.adultPriceNew+singlePrice+this.state.childrenPriceNew
				});
			});
		}
	}

	subNum(type){
		if(type === 0){// 成人
			let adultNum = this.state.adultNum - 1;
			if(adultNum < 1){
				adultNum = 1;
			}
			localStorage.setItem('adultNum', adultNum);
			this.setState({
				adultNum: adultNum,
				adultPriceNew: this.state.adultPrice*adultNum
			}, () => {
				// 总价
				let singlePrice = 0;
				if(this.state.adultNum % 2 > 0){
					singlePrice = this.state.singlePrice;
				}
				this.setState({
					totalPrice: this.state.adultPriceNew+singlePrice+this.state.childrenPriceNew,
					singlePriceNew: singlePrice
				});
			});
		}else {// 儿童
			let childrenNum = --this.state.childrenNum;
			if(childrenNum < 0){
				childrenNum = 0;
			}
			localStorage.setItem('childrenNum', childrenNum);
			this.setState({
				childrenNum: childrenNum,
				childrenPriceNew: this.state.childrenPrice*childrenNum
			}, () => {
				// 总价
				let singlePrice = 0;
				if(this.state.adultNum % 2 > 0){
					singlePrice = this.state.singlePrice;
				}
				this.setState({
					totalPrice: this.state.adultPriceNew+singlePrice+this.state.childrenPriceNew
				});
			});
		}
	}

	render() {
		
		return (
			<div className="submitRouteOrder">
				{/*提交订单*/}
				<div className="warpper">
					<div className="content-top">
						<div className="content-name">
							<span dangerouslySetInnerHTML={{ __html: `${this.state.promotionName}` }}></span>
						</div>
						<div className="content-price">
							<span className="price-left"><i>￥</i>{this.state.totalPrice}</span>
							<span className="price-msg">(此价格不包含租车，拼车价格)</span>
							<span className="price-right"><i>{this.state.sold}</i>份已售</span>
						</div>
						<div className="out-date">
							<span>出行日期</span>
							<Link to={'/calendarPrice/'+this.state.goodsPromotionId}><input type="text" readOnly="readOnly" value={this.state.date} /></Link>
							<i>&gt;</i>
						</div>
					</div>
					
					<div className="person-num">
						<div className="num-item">
							<span>成人</span>
							<span className="aduprc"><i>￥</i>{this.state.adultPriceNew}元</span>
							<div className="adult-num">
								<div className="des-num" onClick={this.subNum.bind(this, 0)}>-</div>
								<input type="text" value={this.state.adultNum} />
								<div className="add-num" onClick={this.addNum.bind(this, 0)}>+</div>
							</div>
						</div>
						<div className="num-item">
							<span>儿童</span>
							<span className="aduprc"><i>￥</i>{this.state.childrenPriceNew}元</span>
							<div className="adult-num">
								<div className="des-num" onClick={this.subNum.bind(this, 1)}>-</div>
								<input type="text" value={this.state.childrenNum}/>
								<div className="add-num" onClick={this.addNum.bind(this, 1)}>+</div>
							</div>
						</div>
						<div className="num-item">
							<span>单房差</span>
							<span className="aduprc"><i>￥</i>{this.state.singlePriceNew}元</span>
						</div>
					</div>

					<div className="person-num">
						<Contact />
						<Tourist />
					</div>
					
					<div className="submit-order" onClick={this.handleSubmit.bind(this)}>立即购买</div>
				</div>
			</div>
		);
	}
}

SubmitRouteOrder.defaultProps = {
};

export default SubmitRouteOrder;
