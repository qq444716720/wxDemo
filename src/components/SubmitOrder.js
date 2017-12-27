import React from 'react';
import { Input } from 'antd';
import 'antd/dist/antd.css';

require('styles/SubmitOrder.css');

class SubmitOrder extends React.Component {

	constructor() {
		super();
		this.state = {
			adultNum: 2,
			childrenNum: 0,
			adultPrice: 1500,
			adultPriceNew: 3000,
			childrenPrice: 500,
			childrenPriceNew: 0,
			singlePrice: 300,
			totalPrice: 3000,
			singlePriceNew: 0
		}

	}

	addNum(type){
		if(type === 0){// 成人
			let adultNum = this.state.adultNum + 1;
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
			<div>
				{/*提交订单*/}
				<div className="warpper">
					
					<div className="content-top">
						<div className="content-name">
							当用户只需知道大致有内容更新时，应该使用红点型，如：社交中的群消息通知
							当用户有必要知晓每条更新时，应该使用数字型。如：社交中的一对一的消息通知。
						</div>
						<div className="content-price">
							<span className="price-left"><i>￥</i>{this.state.totalPrice}</span>
							<span className="price-msg">(此价格不包含租车，拼车价格)</span>
							<span className="price-right"><i>2</i>份已售</span>
						</div>
						<div className="out-date">
							<span>出行日期</span>
							<input type="text" readOnly="readOnly" />
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
						<div className="num-item">
							<span>姓名：</span>
							<Input type="text" className="person-name" placeholder="请输入姓名"/>
						</div>
						<div className="num-item">
							<span>性别：</span>
							<select name="sex" id="" className="person-name">
								<option value="0">女</option>
								<option value="1">男</option>
							</select>
						</div>
						<div className="num-item">
							<span>年龄：</span>
							<select name="age" id="" className="person-name">
								<option value="50">50后</option>
								<option value="60">60后</option>
								<option value="70">70后</option>
								<option value="80">80后</option>
								<option value="90">90后</option>
								<option value="00">00后</option>
							</select>
						</div>
						<div className="num-item">
							<span>电话：</span>
							<input type="text" className="person-name" placeholder="请输入电话"/>
						</div>
					</div>
					
					<div className="submit-order">立即购买</div>
				</div>

				{/*日历*/}
				<div className="date-box"></div>
			</div>
		);
	}
}

SubmitOrder.defaultProps = {
};

export default SubmitOrder;
