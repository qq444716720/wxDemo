import React from 'react';
import { Carousel, Affix } from 'antd';
import 'antd/dist/antd.css';
import Timing from './Timing.js';

var styles = require('styles/ProductDetail.css');

let clockImage = require('../images/time_20171205143720.png');
let kefuImage = require('../images/kefu_20171205143725.png');

class ProductDetail extends React.Component {

    constructor() {
        super();
        this.state = {
           current: '1',
           banners: [],
           currentIndex: 1,
           time: '2017-12-20 18:23:00',
           timeoutFlg: true
        }

    }


    componentDidMount() {
		fetch('http://127.0.0.1:8001/pec/homepage/homepageBanner_list.do?bannerSectionId=1', {
		    method: 'GET'
		}).then(response => response.json()).then(json => {
		    this.setState({
		        banners: json.banners
		    });
		});
    }

    /**
    * tab切换
    */
    handleActive(id){
    	this.setState({
            currentIndex: id
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

        return (
            <div>
	            <div className={styles.swiper}>
		            <Carousel {...settings}>
	                    {
	                        this.state.banners.map((item)=>(
	                            <div key={item.bannerId}><img width="100%" height="100%" src={item.imgUrl} alt=""/></div>
	                        ))
	                    }
	                </Carousel>
	            </div>
	            <div className={styles.pdiv}>
	            	<div className={styles['price-container']}>
	            		<div className={styles.dwell}>
	            			<img src={clockImage} alt="clock"/>
		            		<span className={styles.price}>
		            			<span className={styles.medium}>￥</span>
		            			3210
		            			<span className={styles.medium}>元/人</span>
	            			</span>
	            		</div>
            			<div className={styles.original}>
            				<div>
	            				<div><s className={styles['original-title']}>原价：</s></div>
		            			<div>
		            				<s className={styles['original-price']}>
			            				<span className={styles.small}>￥</span>3210<span className={styles.small}>元/人</span>
		            				</s>
		            			</div>
	            			</div>
            			</div>
	            	</div>
	            	<div className={styles['time-container']}>
	            		<Timing handleTime={this.handleTime.bind(this)} time={this.state.time} />
	            	</div>
	            </div>
	            <div className={styles['route-name']}>
	            	<span>318川藏线+稻城亚丁+青藏线环藏18日自驾游</span>
	            </div>

	            <div className={styles['menu-containeer']}>
	            	<Affix>
		            	<ul>
		            		<a onClick={this.handleActive.bind(this, 1)} href="#d1">
	            		 		<li style={this.state.currentIndex == '1' ? {'background': '#FCE8D0','color': '#FDB143','borderBottom': '1px solid #FDB143'} : {}}>线路说明</li>
            		 		</a>
		            		<a onClick={this.handleActive.bind(this, 2)} href="#d2">
		            			<li style={this.state.currentIndex == '2' ? {'background': '#FCE8D0','color': '#FDB143','borderBottom': '1px solid #FDB143'} : {}}>费用说明</li>
	            			</a>
		            		<a onClick={this.handleActive.bind(this, 3)} href="#d3">
		            			<li style={this.state.currentIndex == '3' ? {'background': '#FCE8D0','color': '#FDB143','borderBottom': '1px solid #FDB143'} : {}}>购买须知</li>
	            			</a>
		            	</ul>
	            	</Affix>
	            </div>
	            <div className={styles.content}>
	            	<div id="d1">
	            		<div className={styles.title}><span></span>线路说明</div>
	            		<div className={styles.cde}>
	            			<div><span>●</span>推荐理由</div>
	            			<p>1.纯玩无购物：承诺100%纯玩，违约退款，赔偿罚金5000元；</p>
	            			<p>2.自由小团：安排7~15座商务车小车团，每车12人封顶，拒绝拥挤乘车；</p>
							<p>1.纯玩无购物：承诺100%纯玩，违约退款，赔偿罚金5000元；</p>
	            			<p>2.自由小团：安排7~15座商务车小车团，每车12人封顶，拒绝拥挤乘车；</p>
	            		</div>
	            	</div>
	            	<div className={styles.cost} id="d2">
	            		<div className={styles.title}><span></span>费用说明</div>
	            		<div className={styles.cde}>
	            			<div><span>●</span>推荐理由</div>
	            			<p>1.纯玩无购物：承诺100%纯玩，违约退款，赔偿罚金5000元；</p>
	            			<p>2.自由小团：安排7~15座商务车小车团，每车12人封顶，拒绝拥挤乘车；</p>
							<p>1.纯玩无购物：承诺100%纯玩，违约退款，赔偿罚金5000元；</p>
	            			<p>2.自由小团：安排7~15座商务车小车团，每车12人封顶，拒绝拥挤乘车；</p>
	            		</div>
	            	</div>
	            	<div className="description rule" id="d3">
	            		<div className={styles.title}><span></span>购买须知</div>
	            		<div className={styles.cde}>
	            			<div><span>●</span>推荐理由</div>
	            			<p>1.纯玩无购物：承诺100%纯玩，违约退款，赔偿罚金5000元；</p>
	            			<p>2.自由小团：安排7~15座商务车小车团，每车12人封顶，拒绝拥挤乘车；</p>
							<p>1.纯玩无购物：承诺100%纯玩，违约退款，赔偿罚金5000元；</p>
	            			<p>2.自由小团：安排7~15座商务车小车团，每车12人封顶，拒绝拥挤乘车；</p>
	            		</div>
	            	</div>
	            </div>
	            <div className={styles.foot}>
	            	<div className={styles.left}>
	            		<div><img src={kefuImage} alt=""/></div>
	            		<div><span>咨询</span></div>
	            	</div>
	            	{
	            		this.state.timeoutFlg
            			?
            			<div className={styles.right}>立即购买</div>
            			:
            			<div className={styles.timeoutBut}>已结束</div>
            		}
	            </div>
      		</div>
        );
    }
}

ProductDetail.defaultProps = {
};

export default ProductDetail;
