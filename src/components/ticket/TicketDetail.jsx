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
						</List>
					</Accordion.Panel>
				</Accordion>

				<div className="detail"> 
        <div className="introBox">
          <div className="contentTitle"><i />营业时间</div>
          <div className="contentScr">
            （周一至周五）上午11:00，下午15:00 （周六周日）11:00，14:00，15:30
          </div>
        </div>
        <div className="introBox">
          <div className="contentTitle"><i />服务电话</div>
          <div className="contentScr">
            4009646567
          </div>
        </div>
        <div className="introBox">
          <div className="contentTitle"><i />景点说明</div>
          <div className="contentScr">
            <pre>抢购时间：即日至2018年1月13日{"\n"}使用日期：2018年1月11日至2018年2月15日{"\n"}逢周六、周日使用需加收60元/套{"\n"}使用方式：无需预约，凭短信上的验证码在售票窗口取票入园{"\n"}发码时间：2018年1月10日发码（手机短信）10号之后订单 购买次日发码{"\n"}{"\n"}秒杀限50个名额，一个手机号限购2套，购完即止！{"\n"}{"\n"}【产品包含】{"\n"}1、 温都水城冰雪快乐小镇大门票2张（1大1小套票 儿童1.2米（不含1.2米）以下；单一个成人也可使用）{"\n"}2、雪圈1小时（1个雪圈）{"\n"}3、戏雪不限时{"\n"}4、海狮表演{"\n"}5、雪地迷宫{"\n"}6、免费停车，车位先到先得{"\n"}{"\n"}注意：以上出游时间实际为抢购时间，收到验证码后请在有效期内使用 如未收到短信验证码请及时联系客服电话4009646567</pre>
          </div>
        </div>
        <div className="introBox">
          <div className="contentTitle"><i />入园公告</div>
          <div className="contentScr">
            <pre>地址与时间】{"\n"}景区地址：北京市昌平区北七家镇郑各庄村温都水城内；营业时间 08：30-17：00{"\n"}咨询热线：4009646567{"\n"}海狮表演时间：（20分钟一场）{"\n"}（周一至周五）上午11:00，下午15:00{"\n"}（周六周日）11:00，14:00，15:30{"\n"}【加收费用规则{"\n"}1、逢周六及周日加收60元/套{"\n"}2、如超出套票人数或儿童超高，补收价格以现场为准{"\n"}3、所有加收费用请自行于景区售票支付，如您拒绝加收，景区可拒绝您办理入园手续！{"\n"}【备注说明】{"\n"}1、此套票为亲子1大1小套票，1名成人仅能携带1名1.2米（不含1.2米）以下儿童入园；单一名成人亦可以使用；{"\n"}2、此产品不含保险，请自行购买保险；{"\n"}3、领取雪圈时需要交付200元雪圈押金，归还时无损坏可退还；{"\n"}4、患有骨折、先天性疾病、心脏病、高血压等高危人群不得入场；{"\n"}5、周五周六、节假日景区人流较多，建议您避开高峰出行；</pre>
          </div>
        </div>
        <div className="introBox">
          <div className="contentTitle"><i />小贴士</div>
          <div className="contentScr">
            <pre>【购买】{"\n"}每个手机号码最多可买20套（1元秒杀限50个名额，一个手机号码限购2套）1个手机号对应1个名字{"\n"}（手机短信可能会被杀毒软件拦截，请注意查收）{"\n"}【收取验证码短信】{"\n"}1、支付后可收到短信通知；{"\n"}入园验证码2018年1月10日发送，10号之后订单 购买次日发码 此为使用唯一凭证；{"\n"}2、一个订单一个码，可拆分使用（比如客人购买5个套票，可以在同一天同时使用5套，也可以在有效期内任意一天使用已购买的任意套数）{"\n"}3、如有误删，请联系客服重发。产品咨询电话：4009646567（9点--20点）{"\n"}【验证游玩】{"\n"}报预约人姓名+手机号+短信验证码在售票处验证进园{"\n"}【可转赠】{"\n"}此验证码在未核销前可转赠给亲友使用！{"\n"}{"\n"}特别说明{"\n"}【关于购买和使用】{"\n"}1、本产品为特殊价格产品，不含发票，不适用于网络购买商品七日无理由退货条款，一经购买或预约，均不退不改；{"\n"}2、本产品为预售抢购产品，不设延期使用，请您在有效期内前往景区游玩{"\n"}3、本产品只限本人或转赠亲友使用，禁止二次售卖，如发现有人在任何渠道进行二次售卖，景区方有权取消其使用资格，并不予退款！{"\n"}4、购买此产品即默认接受条款声明，本活动最终解释权归景区{"\n"}5、因雪季开业及结束时间收天气影响，电子票生效日期有可能会缩短，具体以景区公布为准，如有变动以景区实际情况为准{"\n"}{"\n"}滑雪注意事项{"\n"}1、选择好天气：你要根据近期的天气变化选择好游玩的时间，注意天气预报，最好避开大风天。{"\n"}2、仔细了解滑雪道的高度、宽度、长度、坡度以及走向，检查滑雪工具，注意滑雪时器材和线路的安全可靠性。{"\n"}3、不要擅自滑出滑雪场界线。滑雪时不要打闹、碰撞。{"\n"}4、要根据自己的水平选择适合你的滑雪道，切不可过高估计自己的水平，而冒然行事，要循序渐进。{"\n"}5、在结伴滑行时，相互间一定要拉开距离，切不可为追赶同伴而急速滑降。在中途休息时要停在滑雪道的边上，不能停在陡坡下，并注意从上面滑下来的滑雪者。</pre>
          </div>
        </div>   	
      </div>
			</div>
		);
	}
}

TicketDetail.defaultProps = {
};

export default TicketDetail;
