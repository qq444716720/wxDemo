import React from 'react'
import { Toast, NavBar, Icon , SwipeAction , List, Checkbox, Button, WhiteSpace, WingBlank, Badge } from 'antd-mobile';
import { Link } from 'react-router-dom';
import QueueAnim from 'rc-queue-anim';

const CheckboxItem = Checkbox.CheckboxItem;
let childrenSet = new Set();
let adultSet = new Set();
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
class SelectTourist extends React.Component {

    constructor() {
        super()
        this.state = {
            value: '',
            json: []
        }
    }

    componentDidMount() {
        Toast.loading('Loading...', 0, () => {
			// console.log('Load complete !!!');
		});
        fetch('http://192.168.70.43:8001/member/tourist/tourist_getTourist.do', {
			method: 'POST',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
		}).then(response => response.json()).then(json => {
			this.setState({
                json: json
            });
            Toast.hide();
		});
    }

    onChange = (value, adultFlg) => {
        if(adultFlg === '0'){ // 成人
            if(adultSet.has(value)){
                adultSet.delete(value);
            }else{
                adultSet.add(value);
            }
        }else { // 儿童
            if(childrenSet.has(value)){
                childrenSet.delete(value);
            }else{
                childrenSet.add(value);
            }
        }
        this.setState({
          value
        })
    };

    render() {
        let childrenNum = localStorage.getItem('childrenNum');
        if(!childrenNum){
            childrenNum = 0;
        }
        let adultNum = localStorage.getItem('adultNum');
        if(!adultNum){
            adultNum = 2;
        }
        return (
            <div>
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={() => {
                        this.props.history.goBack();
                        localStorage.setItem('childrenNum', childrenNum);
                        localStorage.setItem('adultNum', adultNum);
                    }}
                    rightContent={[
                        <div onClick={() => {
                            let touristIds = '';
                            if(adultSet.size != adultNum){
                                Toast.info(`请选择${adultNum}位成人`, 1);
                                return;
                            }
                            if(childrenSet.size != childrenNum){
                                Toast.info(`请选择${childrenNum}位儿童`, 1);
                                return;
                            }
                            for(let a of adultSet){
                                touristIds = touristIds+a+',';
                            }
                            for(let c of childrenSet){
                                touristIds = touristIds+c+',';
                            }
                            localStorage.setItem('childrenNum', childrenNum);
                            localStorage.setItem('adultNum', adultNum);
                            localStorage.setItem('selectChildrenNum', childrenSet.size);
                            localStorage.setItem('selectAdultNum', adultSet.size);
                            localStorage.setItem('selectedTouristIds', touristIds);
                            this.props.history.goBack();
                        }}>完成</div>
                    ]}
                >请选择出行人</NavBar>
                <List renderHeader={() => `请选择${adultNum}位成人,${childrenNum}位儿童`}>
                    <QueueAnim delay={300} className="queue-simple">
                    {
                        this.state.json.map((item) => (
                            <SwipeAction key={item.touristId}
                                style={{ backgroundColor: 'gray' }}
                                autoClose
                                right={[
                                    {
                                        text: '删除',
                                        onPress: () => {
                                            Toast.loading('请稍后...', 0, () => {
                                                // console.log('Load complete !!!');
                                            });
                                            fetch('http://192.168.70.43:8001/member/tourist/tourist_deleteTourist.do', {
                                                method: 'POST',
                                                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                                                body: 'touristId=' + item.touristId
                                            }).then(response => response.json()).then(json => {
                                                if(json.success){
                                                    Toast.success(json.msg, 1);
                                                    let touristIdArr = localStorage.getItem('selectedTouristIds').split(',');
                                                    let selectedTouristIds = '';
                                                    for (let touristId of touristIdArr) {
                                                        if(item.touristId != touristId && touristId){
                                                            selectedTouristIds += touristId+',';
                                                        }
                                                    }
                                                    localStorage.setItem('selectedContactsId', selectedTouristIds);
                                                    // 重新渲染
                                                    fetch('http://192.168.70.43:8001/member/tourist/tourist_getTourist.do', {
                                                        method: 'POST',
                                                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                                                    }).then(response => response.json()).then(json => {
                                                        this.setState({
                                                            json: json
                                                        });
                                                        Toast.hide();
                                                    });
                                                }else {
                                                    Toast.hide();
                                                    Toast.fail(json.reason, 1);
                                                }
                                            });
                                        },
                                        style: { backgroundColor: '#F4333C', color: 'white' }
                                    },
                                    {
                                        text: '编辑',
                                        onPress: () => {
                                            localStorage.setItem('editorTourist', JSON.stringify(item));
                                            this.props.history.push('/updateTourist/update')
                                        },
                                        style: { backgroundColor: '#108EE9', color: 'white' }
                                    }
                                ]}
                                >
                                <CheckboxItem defaultChecked={adultSet.has(item.touristId) || childrenSet.has(item.touristId)} onChange={() => this.onChange(item.touristId, item.adultFlg)}>
                                    <div>
                                        {item.touristName}
                                        {
                                            item.adultFlg === '0'
                                            ?
                                            <Badge text="成" style={{ marginLeft: 12, padding: '0 3px', backgroundColor: '#21b68a', borderRadius: 2 }} />
                                            :
                                            <Badge text="童" style={{ marginLeft: 12, padding: '0 3px', backgroundColor: '#f19736', borderRadius: 2 }} />
                                        }
                                    </div>
                                    <div>{cardArr[item.cardType]} {item.currCardNo}</div>
                                </CheckboxItem>
                            </SwipeAction>
                        ))
                    }
                    </QueueAnim>
                    <WhiteSpace />
                    <WhiteSpace />
                    <WhiteSpace />
                    <WingBlank>
                        <Link to={'/updateTourist/add'}><Button type="primary">新增出行人</Button></Link>
                    </WingBlank>
                </List>
            </div>
        )
    }
}

SelectTourist.defaultProps = {
    
};

export default SelectTourist;