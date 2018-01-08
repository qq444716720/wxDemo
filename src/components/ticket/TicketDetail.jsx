import React from 'react';
import { Toast, Accordion, List } from 'antd-mobile';
import 'antd/dist/antd.css';

require('styles/ticket/TicketDetail.scss');

class TicketDetail extends React.Component {

	constructor() {
		super();
		this.state = {
			activeKey: '1',
			dataDetail: {
				
			}
		}

	}

	onChange = (key) => {
		this.setState({
			activeKey: key
		})
	}

	componentDidMount() {
		Toast.loading('Loading...', 0, () => {
			console.log('Load complete !!!');
		});
		
		// fetch('http://127.0.0.1:8001/sale/route/route_baseInfo.do', {
		// 	method: 'POST',
		// 	headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		// 	body: 'goodsRouteId=' + goodsId
		// }).then(response => response.json()).then(json => {
		// 	this.setState({
		// 		dataDetail: json
		// 	});
			Toast.hide();
		// });
	}

	render() {
		
		return (
			<div className="ticketDetail">
				<Accordion activeKey={this.state.activeKey} accordion openAnimation={{}} className="my-accordion" onChange={this.onChange}>
					<Accordion.Panel key='1' header={
						<div>
							<span className="acquiesce"></span><span>双人票</span>
						</div>
						}>
						<List>
							<List.Item>
							<div className="ticketItem acquiesceItem">
								<div className="ticketInfo">
									<div className="basicInf">
										<span className="ticketName">温都水城冰雪快乐小镇1大1小亲子套票</span>
									</div>
									<div className="priceInfo">
										<p className="promoPriceBox">¥<span className="promoPrice">49.90</span>起</p>
										<a className="bookBtn" href="http://wx.yjylx.com/jsp/ticket/ticketCalendar.jsp?goodsTicketId=36051489493726882599">
											<span className="bookTip">预订</span>
										</a>
									</div>
								</div>
							</div>
							</List.Item>
							<List.Item>content 2</List.Item>
							<List.Item>content 3</List.Item>
						</List>
					</Accordion.Panel>
					<Accordion.Panel key='2' header="Title 1">
						<List>
							<List.Item>content 1</List.Item>
							<List.Item>content 2</List.Item>
							<List.Item>content 3</List.Item>
						</List>
					</Accordion.Panel>
				</Accordion>
			</div>
		);
	}
}

TicketDetail.defaultProps = {
};

export default TicketDetail;
