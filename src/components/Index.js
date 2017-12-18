import React from 'react';
import CardItem from './CardItem.js';
import Tloader from 'react-touch-loader';
require('styles/Index.css');

let weekImage = require('../images/week.png');


class Index extends React.Component {

    constructor() {
        super();
        this.state = {
        	list: [],
			count: 3,
			hasMore: 0,
			initializing: 1,
			refreshedAt: Date.now()
		};
    }

    componentDidMount() {
		setTimeout(()=>{
			this.setState({
				hasMore: 1,
				initializing: 2
			});
		},2e3);
    }


    loadMore(resolve){
		setTimeout(()=>{
			var count = this.state.count;
			this.setState({
				count: count+3,
			});

			this.setState({
				hasMore: count>0 && count<4
			});

			resolve();

		},2e3);
	}

    render() {

    	var {hasMore,initializing,count,list} = this.state;
		for (var i = 0; i < count; i++) {
            list.push(<CardItem time="2017-12-18 09:36:00" />);
        }
        return (
            <div>
            	<span className="genericon genericon-next"></span>
	            {/* top img S*/}
	            <div className="topimg">
	            	<img src={weekImage} />
	            </div>
	            {/* top img E*/}

	        	{/* card S*/}
	            <div className="card">
	            	<Tloader onLoadMore={this.loadMore.bind(this)} hasMore={hasMore} initializing={initializing}>
	            		{list}
	            	</Tloader>
	            </div>
	            {/* card E*/}
      		</div>
        );
    }
}

Index.defaultProps = {
};

export default Index;
