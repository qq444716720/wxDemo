import React from 'react';
import CardItem from './common/CardItem';
import Tloader from 'react-touch-loader';
import QueueAnim from 'rc-queue-anim';
require('styles/Index.scss');

let weekImage = require('../images/week.png');


class Index extends React.Component {

	constructor() {
		super();
		this.state = {
			count: 1,
			hasMore: 0,
			initializing: 1,
			pageList: [],
			pageCount: 1
		};
	}

	componentDidMount() {
		fetch('http://192.168.70.43:8001/sale/promotion/promotion_getPromotionBaseList.do', {
			method: 'POST',
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			body:'pageIndex='+this.state.count
		}).then(response => response.json()).then(json => {
			let pageCount = Math.ceil(json.pageCount/10);
			this.setState({
				pageList: json.pageList,
				count: 1,
				pageCount: pageCount
			});
			if(pageCount > 1){
				this.setState({
					hasMore: 1,
					initializing: 2
				});
			}
		});
	}


	loadMore(resolve) {
		fetch('http://192.168.70.43:8001/sale/promotion/promotion_getPromotionBaseList.do', {
			method: 'POST',
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			body:'pageIndex='+(this.state.count+1)
		}).then(response => response.json()).then(json => {
			let count = this.state.count;
			let pageList = this.state.pageList.concat(json.pageList);

			this.setState({
				count: count+1,
				pageList: pageList
			});
			this.setState({
				hasMore: count > 0 && count < this.state.pageCount-1
			});
		});
		resolve();
	}

	render() {

		let { hasMore, initializing } = this.state;
		return (
			<div className="index">
				{/* 头部背景 */}
				<div className="topimg">
					<img src={weekImage} />
				</div>

				{/* content */}
				<div className="card">
					{/* 加载更多 */}
					<Tloader onLoadMore={this.loadMore.bind(this)} hasMore={hasMore} initializing={initializing}>
						{/* 入场动画 */}
						<QueueAnim delay={300} className="queue-simple">
							{/* item */}
							{
								this.state.pageList.map((item) => (
									<CardItem key={item.goodsPromotionId} time="2017-12-29 09:36:00" item={item} />
								))
							}
						</QueueAnim>
					</Tloader>
				</div>
			</div>
		);
	}
}

Index.defaultProps = {
};

export default Index;
