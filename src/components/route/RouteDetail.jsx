import React from 'react';
// import { Affix } from 'antd';
import { Toast } from 'antd-mobile';
// import 'antd/dist/antd.css';
import Affix from 'antd/lib/affix';
import 'antd/lib/affix/style/css';

class RouteDetail extends React.Component {

	constructor() {
		super();
		this.state = {
			currentIndex: 'xlts',
			dataDetail: {
				routeFeatureListPart: [],
				routeTripAssisListPart: [],
				routeContainPart: {
					trafficFlg: '0'
				},
				routeContainNoPart: {
					childTicketType: '0'
				}
			}
		}

	}


	componentDidMount() {
		Toast.loading('Loading...', 0, () => {
			// console.log('Load complete !!!');
		});
		fetch('http://192.168.70.43:8001/sale/route/route_baseInfo.do', {
			method: 'POST',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			body: 'goodsRouteId=' + this.props.goodsId
		}).then(response => response.json()).then(json => {
			this.setState({
				dataDetail: json
			});
			Toast.hide();
		});
	}

    /**
    * tab切换 滚动到相应锚点
    */
	handleActive(id) {
		this.setState({
			currentIndex: id
		});
		// 滚动到相应div
		let top = document.getElementById(id).offsetTop - 55;
		window.scroll(0, top);
	}

	render() {

		return (
			<div>
				<div>
					<div className="menu-containeer">
						<Affix>
							<ul>
								<a onClick={this.handleActive.bind(this, 'xlts')}>
									<li className={this.state.currentIndex == 'xlts' ? 'active' : ''}>线路特色</li>
								</a>
								<a onClick={this.handleActive.bind(this, 'xcjs')}>
									<li className={this.state.currentIndex == 'xcjs' ? 'active' : ''}>行程介绍</li>
								</a>
								<a onClick={this.handleActive.bind(this, 'fysm')}>
									<li className={this.state.currentIndex == 'fysm' ? 'active' : ''}>费用说明</li>
								</a>
							</ul>
						</Affix>
					</div>
					<div className="content">
						<div>
							<div className="general_infor">
								<div className="pkg-detail-con">
									<div id="xlts" className="pkg-detail-infor">
										<h3 className="xlts-title">线路特色</h3>
										<div className="cont marginB">
											{
												this.state.dataDetail.routeFeatureListPart.map((item) => (
													<div key={item.featureId}>
														<div className="section-feature-title">
															{item.featureDetailTitle}
														</div>
														<div className="section-feature-item-list">
															{item.featureDetailContent}
														</div>
														<div className="line_border">
															<dl>
																<dd>
																	<ul className="clear city_pic clearfix">
																	{
																		item.featureArrayUrl.map((picture, index) => (
																			<li key={index} className="cpts_li" >
																				<div className="cpts_pic_con">
																					<img src={picture} />
																				</div>
																			</li>
																		))
																	}
																	</ul>
																</dd>
															</dl>
														</div>
													</div>
												))
											}

										</div>
									</div>
									<div id="xcjs" className="pkg-detail-infor">
										<h3 className="xlts-title">行程介绍</h3>
										<div className="tripcontent">
										{
											this.state.dataDetail.routeTripAssisListPart.map((item) => (
												<div key={item.tripId}>
													<div id={'day'+item.tripOfDay} className="tripdays">
														<div className="day-hd">
															<div className="daynum">D{item.tripOfDay}</div>
															<div className="dayname">{item.tripPlan}</div>
														</div>
														<div className="day-bd">
															<div className="trave-des marginB">
																<div className="hg">行程描述</div>
																<div className="bg">
																	{item.tripDescribe}
																</div>
															</div>
															<div className="trave-des marginB">
																<dl>
																{
																	item.routeOneTripList.map((oneTrip) => (
																		<div key={oneTrip.oneTripId}>
																			<dt></dt>
																			<dd>
																				<div className="pp ">
																					{oneTrip.touristTime}{oneTrip.touristContent}
																				</div>
																				<div className="pp ">
																					{oneTrip.smallTitle}
																				</div>
																				<div className="pp ">
																					{oneTrip.smallTitleText}
																				</div>
																				<div className="line_border">
																					<dl>
																						<dd>
																							<ul className="clear city_pic clearfix">
																							{
																								oneTrip.routeTripPicList.map((tripPic, index) => (
																									<div key={index}>
																										<li>
																											<div className="city_pic_con">
																												<img src={tripPic.imgUrl} style={{ display: 'inline'}} />
																											</div>
																											<span>{tripPic.imgDescribe}</span>
																										</li>
																									</div>
																								))
																							}
																							</ul>
																						</dd>
																					</dl>
																				</div>
																			</dd>
																		</div>
																	))
																}
																</dl>
															</div>
															<div className="meals marginB">
																<table className="mealsTable">
																	<tr>
																		<td className="tablePic"><img alt="" src="http://image.yjylx.com/images/travel/meals1.png" /></td>
																		<td>早餐：</td>
																		<td>{item.breakfast}</td>
																	</tr>
																	<tr>
																		<td></td>
																		<td>午餐：</td>
																		<td>{item.lunch}</td>
																	</tr>
																	<tr>
																		<td></td>
																		<td>晚餐：</td>
																		<td>{item.dinner}</td>
																	</tr>
																</table>
															</div>
															<div className="accommodation marginB">
																<table className="mealsTable">
																	<tr>
																		<td className="tablePic"><img alt="" src="http://image.yjylx.com/images/travel/house1.png" /></td>
																		<td>住宿：</td>
																		<td>{item.accommodation}</td>
																	</tr>
																</table>
															</div>
														</div>
													</div>
												</div>
											))
										}
										</div>
									</div>
									<div id="fysm" className="pkg-detail-infor">
										<h3 className="xlts-title">费用说明</h3>
										<div className="includeCost">
											<div className="hg">
												<i className="costI"></i>
												费用包含
											</div>
											<div className="costdetail marginB" id="routeContainList">
												{
													this.state.dataDetail.routeContainPart.trafficFlg === '1' ?
													<div>
														交通：
														{
															this.state.dataDetail.routeContainPart === '1' ?
															<span>
																{this.state.dataDetail.routeContainPart.airportExplain }团队/散客机票${this.state.dataDetail.routeContainPart.airportTaxExplain}（团队机票将统一出票，散客机票因实时计价预订后即刻出票）,
															</span>
															:
															''
														}
														{
															this.state.dataDetail.routeContainPart.trainFlg === '1' ?
															<span>
																{this.state.dataDetail.routeContainPart.trainExplain }火车票{this.state.dataDetail.routeContainPart.trainTypeExplain },
															</span>
															:
															''
														}
														{
															this.state.dataDetail.routeContainPart.tourBusFlg === '1' ?
															<span>
																{this.state.dataDetail.routeContainPart.tourBusExplain }旅游巴士,
															</span>
															:
															''
														}
														{
															this.state.dataDetail.routeContainPart.loaclBusFlg === '1' ?
															<span>
																当地旅游巴士,
															</span>
															:
															''
														}
														{
															this.state.dataDetail.routeContainPart.goBackTicketFlg === '1' ?
															<span>
																往返车票,
															</span>
															:
															''
														}
														{
															this.state.dataDetail.routeContainPart.steamerFlg === '1' ?
															<span>
																{this.state.dataDetail.routeContainPart.steamerExplain }船票{this.state.dataDetail.routeContainPart.steamerRemark }
															</span>
															:
															''
														}
														<br />
													</div>
													: ''
												}
												{
													this.state.dataDetail.routeContainPart.scenicVehicle === '1' ?
													<div>
														小交通：景区内用车（{this.state.dataDetail.routeContainPart.scenicVehicleRemark } ）。<br />
													</div>
													:
													''
												}
												{
													this.state.dataDetail.routeContainPart.liveType !=  '' || this.state.dataDetail.routeContainPart.liveShipFlg == '1' ?
													<div>
														住宿：
														{
															this.state.dataDetail.routeContainPart.liveType === '1' ?
															<div>
																行程所列酒店。
															</div>
															:
															''
														}
														{
															this.state.dataDetail.routeContainPart.liveType === '2' ?
															<div>
																{this.state.dataDetail.routeContainPart.liveRank}星级酒店标准{this.state.dataDetail.routeContainPart.liveNumber}人间。
															</div>
															:
															''
														}
														{
															this.state.dataDetail.routeContainPart.liveType === '3' ?
															<div>
																酒店 标准${this.state.dataDetail.routeContainPart.standardHouse }人间。
															</div>
															:
															''
														}
														{
															this.state.dataDetail.routeContainPart.liveType === '4' ?
															<div>
																{this.state.dataDetail.routeContainPart.liveDestination}{this.state.dataDetail.routeContainPart.liveDestinationRankExplain}酒店 标准{this.state.dataDetail.routeContainPart.liveDestinationPeople}人间{this.state.dataDetail.routeContainPart.liveDestinationNumber}晚{this.state.dataDetail.routeContainPart.liveDestinationRemark }。
															</div>
															:
															''
														}
														{
															this.state.dataDetail.routeContainPart.liveShipFlg === '1' ?
															<div>
																{this.state.dataDetail.routeContainPart.liveShipRetail}{this.state.dataDetail.routeContainPart.liveShipNumber}晚 {this.state.dataDetail.routeContainPart.liveShipRemark}。
															</div>
															:
															''
														}
														<br />
													</div>
													:
													''
												}
												{
													this.state.dataDetail.routeContainPart.mealsStandard != '2' ?
													<div>
														用餐：
														{
															this.state.dataDetail.routeContainPart.mealsStandard === '1' ?
															<div>
																行程中团队标准用餐，{this.state.dataDetail.routeContainPart.mealsRank }（中式餐或自助餐或特色餐，含飞机上用餐，自由活动期间用餐请自理；如因自身原因放弃用餐，则餐费不退）。
															</div>
															:
															''
														}
														{
															this.state.dataDetail.routeContainPart.mealsStandard === '2' ?
															<div>
																行程中团队标准用餐，{this.state.dataDetail.routeContainPart.mealsDefind }（中式餐或自助餐或特色餐，自由活动期间用餐请自理；如因自身原因放弃用餐，则餐费不退）。
															</div>
															:
															''
														}
														<br />
													</div>
													:
													''
												}
												{
													this.state.dataDetail.routeContainPart.allTicketFlg === '1' ?
													<div>
														门票：行程中所含的景点首道大门票，{this.state.dataDetail.routeContainPart.allTicketRemark }。<br />
													</div>
													:
													''
												}
												{
													this.state.dataDetail.routeContainPart.guideType != '0' ?
													<div>
														导服：
														{
															this.state.dataDetail.routeContainPart.guideType === '1' ?
															<div>
																当地中文导游，{this.state.dataDetail.routeContainPart.localGuideRemark }。
															</div>
															:
															''
														}
														{
															this.state.dataDetail.routeContainPart.guideType === '2' ?
															<div>
																全程陪同中文导游，{this.state.dataDetail.routeContainPart.wholeGuideRemark }。
															</div>
															:
															''
														}
														{
															this.state.dataDetail.routeContainPart.guideType === '3' ?
															<div>
																全陪和当地中文导游，{this.state.dataDetail.routeContainPart.allGuideRemark } 。
															</div>
															:
															''
														}
														<br />
													</div>
													:
													''
												}
												{
													this.state.dataDetail.routeContainPart.childTicketType != '0' ?
													<div>
														儿童价标准：
														{
															this.state.dataDetail.routeContainPart.childTicketType === '1' ?
															<div>
																年龄{this.state.dataDetail.routeContainPart.ageLimitStart }~{this.state.dataDetail.routeContainPart.ageLimitEnd }周岁（不含），{this.state.dataDetail.routeContainPart.ageLimitBedExplain }，{this.state.dataDetail.routeContainPart.ageLimitRemark } 。
															</div>
															:
															''
														}
														{
															this.state.dataDetail.routeContainPart.childTicketType === '2' ?
															<div>
																身高{this.state.dataDetail.routeContainPart.heightLimitStart }~{this.state.dataDetail.routeContainPart.heightLimitEnd }米（含），{this.state.dataDetail.routeContainPart.heightLimitBedExplain }，{this.state.dataDetail.routeContainPart.heightLimitRemark } 。
															</div>
															:
															''
														}
														{
															this.state.dataDetail.routeContainPart.childTicketType === '3' ?
															<div>
																儿童价特殊说明 ，{this.state.dataDetail.routeContainPart.childTicketContent }
															</div>
															:
															''
														}
														<br />
													</div>
													:
													''
												}
												{
													this.state.dataDetail.routeContainPart.present != '' ?
													<div>
														赠送：{this.state.dataDetail.routeContainPart.present }<br />
													</div>
													:
													''
												}
												{
													this.state.dataDetail.routeContainPart.other != '' ?
													<div>
														其他：{this.state.dataDetail.routeContainPart.other }<br />
													</div>
													:
													''
												}
											</div>
										</div>
										<div className="includeCost">
											<div className="hg">
												<i className="costI"></i>
												费用不包含
											</div>
											<div className="costdetail marginB" id="routeContainNoList">
											{
												this.state.dataDetail.routeContainNoPart.childTicketType === '1' ?
												<div>
													小交通：{this.state.dataDetail.routeContainNoPart.noPickUpPlace }机场{this.state.dataDetail.routeContainNoPart.noPickUpTypeExplain }服务。<br />
												</div>
												:
												''
											}
											{
												this.state.dataDetail.routeContainNoPart.noAirportTax === '1' ?
												<div>
													机票税：往返机票税{this.state.dataDetail.routeContainNoPart.noAirportTaxCost }元/人，报名时与团费一起支付<br />
												</div>
												:
												''
											}
											{
												this.state.dataDetail.routeContainNoPart.noSingleRoomFlg === '1' ?
												<div>
													单房差：单房差（{this.state.dataDetail.routeContainNoPart.noSingleRoomRemark } ）。<br />
												</div>
												:
												''
											}
											{
												this.state.dataDetail.routeContainNoPart.noOtherTicketFlg === '1' ?
												<div>
													门票：行程中注明需要另行支付的自费景点（{this.state.dataDetail.routeContainNoPart.noOtherTicketRemark } ）。<br />
												</div>
												:
												''
											}
											<div>
												其他：{this.state.dataDetail.routeContainNoPart.noOther }。<br />
											</div>
											{
												this.state.dataDetail.routeContainNoPart.noAdditional1Flg === '1' || this.state.dataDetail.routeContainNoPart.noAdditional2Flg === '1' || this.state.dataDetail.routeContainNoPart.noAdditional3Flg === '1' || this.state.dataDetail.routeContainNoPart.noAdditional4Flg === '1' || this.state.dataDetail.routeContainNoPart.noAdditional5Flg === '1' ?
												<div>
													补充：
													{
														this.state.dataDetail.routeContainNoPart.noAdditional1Flg === '1' ?
														<span>
															丽江古城维护费80元/人,
														</span>
														:
														''
													}
													{
														this.state.dataDetail.routeContainNoPart.noAdditional2Flg === '1' ?
														<span>
															海南政府调节金：依照当地有关部门的相关规定收取,
														</span>
														:
														''
													}
													{
														this.state.dataDetail.routeContainNoPart.noAdditional4Flg === '1' ?
														<span>
															酒店内洗衣、理发、电话、传真、收费电视、饮品、烟酒等个人消费,
														</span>
														:
														''
													}
													{
														this.state.dataDetail.routeContainNoPart.noAdditional5Flg === '1' ?
														<span>
															当地参加的自费以及以上“费用包含”中不包含的其它项目 ,
														</span>
														:
														''
													}
													<br />
												</div>
												:
												''
											}
											{
												this.state.dataDetail.routeContainNoPart.noTravelInsurance === '1' ?
												<div>
													旅游人身意外保险 。
												</div>
												:
												''
											}
											</div>
										</div>
									</div>
									<div style={{ width: '100%', height: 48 }} />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

RouteDetail.defaultProps = {
};

export default RouteDetail;
