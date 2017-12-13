require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import { Carousel } from 'antd';
import 'antd/dist/antd.css';
import Timing from './Timing.js'

let clockImage = require('../images/time_20171205143720.png');
let kefuImage = require('../images/kefu_20171205143725.png');

class AppComponent extends React.Component {

    constructor() {
        super();
        this.state = {
           current: '1',
           banners: [],
           tabs:[
                {tabName: '线路说明',id: 1},
                {tabName: '费用说明',id: 2},
                {tabName: '购买须知',id: 3}
           ],
           currentIndex: 1,
           time: '2017-12-20 18:23:00',
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
		var top = this.refs.routeName.offsetTop; // 记录临界点
		window.addEventListener('scroll',()=>{
			var tabHeader = this.refs.tabHeader;
			var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
			if(scrollTop < top){ // 还原
				tabHeader.style.position = 'relative';
			}else if(scrollTop > top){ // 浮动
				tabHeader.style.top = '0px';
				tabHeader.style.position = 'fixed';
			}
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


    render() {

    	// 循环tab
    	var _this=this;
        var tabList = this.state.tabs.map(function(val,index) {
            var tabStyle = val.id == this.state.currentIndex ? 'active' : '';
            var node = '#d' + val.id;
            return <a key={index} onClick={this.handleActive.bind(_this,val.id)} href={node}><li className={tabStyle}>{val.tabName}</li></a>
        }.bind(_this));

        const settings = {
    		dots: true,
    		infinite: true,
    		autoplaySpeed: 2000,
    		slidesToShow: 1,
    		autoplay: true
    	}

        return (
            <div>
	            <div className="swiper">
		            <Carousel {...settings}>
	                    {
	                        this.state.banners.map((item)=>(
	                            <div key={item.bannerId}><img width="100%" height="100%" src={item.imgUrl} alt=""/></div>
	                        ))
	                    }
	                </Carousel>
	            </div>
	            <div className="pdiv">
	            	<div className="price-container">
	            		<div className="dwell">
	            			<img src={clockImage} alt="clock"/>
		            		<span className="price">
		            			<span className="medium">￥</span>
		            			3210
		            			<span className="medium">元/人</span>
	            			</span>
	            		</div>
            			<div className="original">
            				<div>
	            				<div><s className="original-title">原价：</s></div>
		            			<div>
		            				<s className="original-price">
			            				<span className="small">￥</span>3210<span className="small">元/人</span>
		            				</s>
		            			</div>
	            			</div>
            			</div>
	            	</div>
	            	<Timing time={this.state.time} />
	            </div>
	            <div ref="routeName" className="route-name">
	            	<span>318川藏线+稻城亚丁+青藏线环藏18日自驾游</span>
	            </div>

	            <div className="menu-containeer">
	            	<ul ref='tabHeader'>
	            		{tabList}
	            	</ul>
	            </div>
	            <div className="content">
	            	<div className="description" id="d1">
	            		<div className="title"><span></span>线路说明</div>
	            		<div className="cde">
	            			<div><span>●</span>推荐理由</div>
	            			<p>1.纯玩无购物：承诺100%纯玩，违约退款，赔偿罚金5000元；</p>
	            			<p>2.自由小团：安排7~15座商务车小车团，每车12人封顶，拒绝拥挤乘车；</p>
							<p>1.纯玩无购物：承诺100%纯玩，违约退款，赔偿罚金5000元；</p>
	            			<p>2.自由小团：安排7~15座商务车小车团，每车12人封顶，拒绝拥挤乘车；</p>
	            		</div>
	            	</div>
	            	<div className="description cost" id="d2">
	            		<div className="title"><span></span>费用说明</div>
	            		<div className="cde">
	            			<div><span>●</span>推荐理由</div>
	            			<p>1.纯玩无购物：承诺100%纯玩，违约退款，赔偿罚金5000元；</p>
	            			<p>2.自由小团：安排7~15座商务车小车团，每车12人封顶，拒绝拥挤乘车；</p>
							<p>1.纯玩无购物：承诺100%纯玩，违约退款，赔偿罚金5000元；</p>
	            			<p>2.自由小团：安排7~15座商务车小车团，每车12人封顶，拒绝拥挤乘车；</p>
	            		</div>
	            	</div>
	            	<div className="description rule" id="d3">
	            		<div className="title"><span></span>购买须知</div>
	            		<div className="cde">
	            			<div><span>●</span>推荐理由</div>
	            			<p>1.纯玩无购物：承诺100%纯玩，违约退款，赔偿罚金5000元；</p>
	            			<p>2.自由小团：安排7~15座商务车小车团，每车12人封顶，拒绝拥挤乘车；</p>
							<p>1.纯玩无购物：承诺100%纯玩，违约退款，赔偿罚金5000元；</p>
	            			<p>2.自由小团：安排7~15座商务车小车团，每车12人封顶，拒绝拥挤乘车；</p>
	            		</div>
	            	</div>
	            </div>
	            <div className="foot">
	            	<div className="left">
	            		<div><img src={kefuImage} alt=""/></div>
	            		<div><span>咨询</span></div>
	            	</div>
	            	<div className="right">立即购买</div>
	            </div>
      		</div>
        );
    }
}

AppComponent.defaultProps = {
};

export default AppComponent;
