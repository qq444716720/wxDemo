require('normalize.css/normalize.css');


import React from 'react';


class Timing extends React.Component {

    constructor() {
        super();
        this.state = {
           days: '0',
           hours: '00',
           minutes: '00',
           seconds: '00'
        }

    }

    componentDidMount() {

		/**
		* 倒计时
		*/
	    this.timer = setInterval(function(){
            var leftTime = (new Date(this.props.time)) - (new Date()); //计算剩余的毫秒数
            if(leftTime <= 0){
	            clearTimeout(this.timer);
	            return;
	        }

		    var days = parseInt(leftTime / 1000 / 60 / 60 / 24, 10); //计算剩余的天数
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
	        	days: days,
	            hours: hours,
	            minutes: minutes,
	            seconds: seconds
	        });
        }.bind(this), 100);
    }


    render() {

        return (
        	<div className="clock-box">
        		<span className="prompt">离结束:</span>
        		<span className="days">{this.state.days}</span>天
        		<span className="hour">{this.state.hours}</span>
        		<span className="mark">:</span>
        		<span className="minute">{this.state.minutes}</span>
        		<span className="mark">:</span>
        		<span className="second">{this.state.seconds}</span>
        	</div>
        );
    }
}

Timing.defaultProps = {
};

export default Timing;
