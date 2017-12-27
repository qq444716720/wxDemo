import React from 'react';
import { Calendar } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';


const extra = {
  // '2017/12/26': { disable: true },
};

// 今天之前的日期
const now = new Date();
for (var i = now.getDate()-1; i > 0; i--) {
	extra[+new Date(now.getFullYear(), now.getMonth(), i)] = { disable: true };
}

extra[+new Date(now.getFullYear(), now.getMonth(), now.getDate() + 5)] = { info: '￥2130'};
extra[+new Date(now.getFullYear(), now.getMonth(), now.getDate() + 6)] = { info: '￥253'};
extra[+new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7)] = { info: '￥2830'};
extra[+new Date(now.getFullYear(), now.getMonth(), now.getDate() + 8)] = { info: '￥213'};


class CalendarPrice extends React.Component {

	constructor() {
		super();
		this.state = {
			show: true
		};
	}

	componentDidMount() {

	}

	onSelectHasDisableDate = (dates) => {
	    console.warn('onSelectHasDisableDate', dates);
	}

	getDateExtra = date => extra[+date];

	render() {

		return (
			<div>
				<Calendar
			          visible={this.state.show}
			          type='one'
			          onSelectHasDisableDate={this.onSelectHasDisableDate}
			          getDateExtra={this.getDateExtra}
			          defaultDate={now}
			          minDate={new Date(+now - 5184000000)}
			          maxDate={new Date(+now + 31536000000)}
			        />
			</div>
		);
	}
}

CalendarPrice.defaultProps = {
};

export default CalendarPrice;
