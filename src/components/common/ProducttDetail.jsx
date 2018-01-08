import React from 'react';
import { Carousel } from 'antd';
import { Link } from 'react-router-dom';
import 'antd/dist/antd.css';
import Timing from '../common/Timing';
import RouteDetail from '../route/RouteDetail';
import TicketDetail from '../ticket/TicketDetail';

require('styles/common/Detail.scss');

let clockImage = require('../../images/time_20171205143720.png');
let kefuImage = require('../../images/kefu_20171205143725.png');

class ProducttDetail extends React.Component {

	constructor() {
		super();
		this.state = {
			banners: [],
			promotionBase: {},
			timeoutFlg: true
		}

	}


	componentDidMount() {
		const { goodsPromotionId, goodsType } = this.props.match.params;
		fetch('http://127.0.0.1:8001/sale/promotion/promotion_getPromotionBaseInfo.do', {
			method: 'POST',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			body: 'goodsPromotionId=' + goodsPromotionId + '&goodsType=' + goodsType
		}).then(response => response.json()).then(json => {
			this.setState({
				promotionBase: json.promotionBase,
				banners: json.banners
			});
		});

		fetch('http://127.0.0.1:8001/sale/promotion/price_getPromotionPriceList.do', {
			method: 'POST',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			body: 'goodsPromotionId=' + goodsPromotionId
		}).then(response => response.json()).then(json => {
			localStorage.setItem('datePriceJson', JSON.stringify(json));
		});
	}

	handleTime() {
		this.setState({
			timeoutFlg: false
		});
	}


	render() {
		const settings = {
			dots: true,
			infinite: true,
			autoplaySpeed: 2000,
			slidesToShow: 1,
			autoplay: true
		}
		const { goodsPromotionId,promotionToDate, promotionOldPrice, promotionPrice, promotionName } = this.state.promotionBase;
		const { goodsId, goodsType } = this.props.match.params;

		let content = '';
		if(goodsType === '4') {
			content = <RouteDetail goodsId={goodsId} />
		}else if(goodsType === '1') {
			content = <TicketDetail goodsId={goodsId} />
		}

		return (
			<div className="producttDetail">
				<div>
					<div className="swiper">
						<Carousel {...settings}>
							{
								this.state.banners.map((item, index) => (
									<div key={index}><img width="100%" height="100%" src={item} alt="" /></div>
								))
							}
						</Carousel>
					</div>
					<div className="pdiv">
						<div className="price-container">
							<div className="dwell">
								<img src={clockImage} alt="clock" />
								<span className="price">
									<span className="medium">￥</span>
									{promotionPrice}
									<span className="medium">元/人</span>
								</span>
							</div>
							<div className="original">
								<div>
									<div><s className="original-title">原价：</s></div>
									<div>
										<s className="original-price">
											<span className="small">￥</span>{promotionOldPrice}<span className="small">元/人</span>
										</s>
									</div>
								</div>
							</div>
						</div>
						<div className="time-container">
							<Timing handleTime={this.handleTime.bind(this)} time={promotionToDate} />
						</div>
					</div>
					<div className="route-name">
						<span dangerouslySetInnerHTML={{ __html: `${promotionName}` }}></span>
					</div>
				</div>

				{content}

				<div className="foot">
					<div className="left">
						<div><img src={kefuImage} alt="" /></div>
						<div><span>咨询</span></div>
					</div>
					{
						this.state.timeoutFlg
							?
							<Link to={'/orderRoute/'+goodsPromotionId+'/0'}><div className="right">立即购买</div></Link>
							:
							<div className="timeoutBuy">已结束</div>
					}
				</div>
			</div>
		);
	}
}

ProducttDetail.defaultProps = {
};

export default ProducttDetail;
