import React from 'react';
import { Calendar, Toast } from 'antd-mobile';
// import 'antd-mobile/dist/antd-mobile.css';
import moment from 'moment';

const extra = {
  // '2017/12/26': { disable: true },
};

const temp = {};

// 今天之前的日期
const now = new Date();
// for (var i = now.getDate()-1; i > 0; i--) {
// 	extra[+new Date(now.getFullYear(), now.getMonth(), i)] = { disable: true };
// }
let datePriceJson = JSON.parse(localStorage.getItem('datePriceJson'));
class CalendarPrice extends React.Component {
	
	constructor() {
		super();
		this.state = {
			goodsPromotionId: ''
		}
		
		datePriceJson.map((item) => {
			extra[+new Date(item.priceDate)] = { info: '￥'+item.promotionPrice}
			temp[moment(item.priceDate).format('YYYY-MM-DD')] = item.promotionPrice;
		})
	}
	
	onSelectHasDisableDate = (dates) => {
		// console.warn('onSelectHasDisableDate', dates);
	}
	
	componentDidMount() {
		let { goodsPromotionId } = this.props.match.params;
		this.setState({
			goodsPromotionId: goodsPromotionId
		});
	}
	
	onCancel() {
		this.props.history.goBack();
	}
	
	onConfirm(startDateTime) {
		let date = moment(startDateTime).format('YYYY-MM-DD');
		if(temp[date]){
			this.props.history.push('/order/'+this.state.goodsPromotionId+'/'+date);
		}else{
			Toast.info('该日期暂无价格!', 1);
		}
	}

	getDateExtra = date => extra[+date];

	render() {

		return (
			<div>
				<Calendar
			          visible={true}
			          type='one'
			          onSelectHasDisableDate={this.onSelectHasDisableDate}
			          getDateExtra={this.getDateExtra}
					  defaultTimeValue={now}
					  onConfirm={this.onConfirm.bind(this)}
					  onCancel={this.onCancel.bind(this)}
			          minDate={new Date(+now)}
			          maxDate={new Date(+now + 31536000000)}
			        />
			</div>
		);
	}
}

CalendarPrice.defaultProps = {
};

export default CalendarPrice;
