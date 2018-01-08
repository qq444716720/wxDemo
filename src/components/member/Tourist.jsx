import React from 'react'
import { Link } from 'react-router-dom';
import { List, Badge } from 'antd-mobile';

const Item = List.Item;

const cardArr = {
    '1': '二代身份证',
    '2': '护照',
    '3': '军官证',
    '4': '港澳通行证',
    '7': '台胞证',
    '8': '回乡证',
    '9': '户口簿',
    '10': '出生证明',
    '11': '台湾通行证'
}

class Tourist extends React.Component {

    constructor() {
        super()
        this.state = {
            json: [],
            childrenNum: 0,
            adultNum: 0
        }
    }

    componentDidMount() {
        let touristIds = localStorage.getItem('selectedTouristIds');
        fetch('http://127.0.0.1:8001/member/tourist/tourist_getTourist.do', {
			method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: 'touristId=' + touristIds
		}).then(response => response.json()).then(json => {
			this.setState({
                json: json
            });
            console.log(json)
		});
    }

    render() {
        return (
            <div className="contact" style={{marginBottom: '30px'}}>
                <div className="top">
                    <div className="title">出行人</div>
                    <Link to={'/selectTourist'}><div className="select">选择出行人</div></Link>
                </div>
                
                {
                    this.state.json.map((item) => (
                        <Item key={item.touristId} >
                            {item.touristName}
                            {
                                item.adultFlg === '0'
                                ?
                                <Badge text="成" style={{ marginLeft: 12, padding: '0 3px', backgroundColor: '#21b68a', borderRadius: 2 }} />
                                :
                                <Badge text="童" style={{ marginLeft: 12, padding: '0 3px', backgroundColor: '#f19736', borderRadius: 2 }} />
                            }
                            <br/>
                            {cardArr[item.cardType]} {item.currCardNo}
                        </Item>
                    ))
                }
            </div>
        )
    }
}

Tourist.defaultProps = {
    
};

export default Tourist;