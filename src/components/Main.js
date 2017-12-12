require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import { Carousel } from 'antd';
import 'antd/dist/antd.css';


let clockImage = require('../images/time_20171205143720.png');
let kefuImage = require('../images/kefu_20171205143725.png');

class AppComponent extends React.Component {

    constructor(props) {

        super(props);
        this.state = {
           current: '1',
           banners: [],
           tabs:[
                {tabName: '线路说明',id: 1},
                {tabName: '费用说明',id: 2},
                {tabName: '购买须知',id: 3}
           ],
           currentIndex: 1,
           time: '2017-12-13 00:00:00',
           hours: '00',
           minutes: '00',
           seconds: '00'
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


		/**
		* 倒计时
		*/
	    this.timer = setInterval(function(){
            var leftTime = (new Date(this.state.time)) - (new Date()); //计算剩余的毫秒数
            if(leftTime <= 0){
	            clearTimeout(this.timer);
	            return;
	        }

		    // var days = parseInt(leftTime / 1000 / 60 / 60 / 24, 10); //计算剩余的天数
		    var hours = parseInt(leftTime / 1000 / 60 / 60 % 24, 10);
		    if(hours < 10){
		    	hours = '0'+hours;
		    }
		    var minutes = parseInt(leftTime / 1000 / 60 % 60, 10);
		    if(minutes < 10){
		    	minutes = '0'+minutes;
		    }
		    var seconds = parseInt(leftTime / 1000 % 60, 10);
		    if(seconds < 10){
		    	seconds = '0'+seconds;
		    }
	        this.setState({
	            hours: hours,
	            minutes: minutes,
	            seconds: seconds
	        });
        }.bind(this), 100);
    }

    /**
    * tab切换
    */
    handleActive(id){
    	this.setState({
            currentIndex:id
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
    		autoplaySpeed: 500,
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
	            	<div className="time-container">
	            		<span className="prompt">离结束:</span>
	            		<span className="hour">{this.state.hours}</span>
	            		<span className="mark">:</span>
	            		<span className="minute">{this.state.minutes}</span>
	            		<span className="mark">:</span>
	            		<span className="second">{this.state.seconds}</span>
	            	</div>
	            </div>
	            <div className="route-name">
	            	<span>318川藏线+稻城亚丁+青藏线环藏18日自驾游</span>
	            </div>

	            <div className="menu-containeer">
	            	<ul>
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
