import React from 'react'
import { NavBar, Icon , SwipeAction , List, Radio, Button, WhiteSpace, WingBlank, Toast } from 'antd-mobile';
import { Link } from 'react-router-dom';
import QueueAnim from 'rc-queue-anim';

const RadioItem = Radio.RadioItem;

class SelectContact extends React.Component {

    constructor() {
        super()
        this.state = {
            value: localStorage.getItem('selectedContactsId'),
            json: []
        }
    }
    
    componentDidMount() {
        Toast.loading('Loading...', 0, () => {
			// console.log('Load complete !!!');
		});
        fetch('http://192.168.70.43:8001/member/contacts/contacts_getContactsList.do', {
			method: 'POST',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
			// body: 'goodsPromotionId=' + goodsPromotionId + '&goodsType=' + goodsType
		}).then(response => response.json()).then(json => {
			this.setState({
                json: json
            });
            Toast.hide();
		});
    }

    onChange = (value) => {
        this.setState({
          value
        })
    };

    render() {
        return (
            <div className="select-contact">
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.props.history.goBack()}
                    rightContent={[
                        <div onClick={() => {
                            if(!this.state.value){
                                Toast.info('请选择联系人', 1);
                            }else{
                                localStorage.setItem('selectedContactsId', this.state.value);
                                this.props.history.goBack();
                            }
                        }}>完成</div>
                    ]}
                >选择联系人</NavBar>
                <List renderHeader={() => '请选择联系人'}>
                    <QueueAnim delay={300} className="queue-simple">
                    {
                        this.state.json.map((item, index) => (
                            <SwipeAction key={index}
                                style={{ backgroundColor: 'gray' }}
                                autoClose
                                right={[
                                    {
                                        text: '删除',
                                        onPress: () => {
                                            Toast.loading('请稍后...', 0, () => {
                                                // console.log('Load complete !!!');
                                            });
                                            fetch('http://192.168.70.43:8001/member/contacts/contacts_deleteContacts.do', {
                                                method: 'POST',
                                                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                                                body: 'contactsId=' + item.contactsId
                                            }).then(response => response.json()).then(json => {
                                                if(json.success){
                                                    Toast.success(json.reason, 1);
                                                    if(item.contactsId === localStorage.getItem('selectedContactsId')){
                                                        localStorage.setItem('selectedContactsId', '');
                                                        this.setState({
                                                            value: ''
                                                        });
                                                    }
                                                    // 重新渲染
                                                    fetch('http://192.168.70.43:8001/member/contacts/contacts_getContactsList.do', {
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
                                            localStorage.setItem('editorContact', JSON.stringify(item));
                                            this.props.history.push('/updateContact/update');
                                        },
                                        style: { backgroundColor: '#108EE9', color: 'white' }
                                    }
                                ]}
                                >
                                <RadioItem checked={this.state.value == item.contactsId} onChange={() => this.onChange(item.contactsId)}>
                                    <div>{item.contactsName}</div>
                                    <div>{item.mobile}</div>
                                </RadioItem>
                            </SwipeAction>
                        ))
                    }
                    <WhiteSpace />
                    <WhiteSpace />
                    <WhiteSpace />
                    <WingBlank>
                        <Link to={'/updateContact/add'}><Button type="primary">新增联系人</Button></Link>
                    </WingBlank>
                    </QueueAnim>
                </List>
            </div>
        )
    }
}

SelectContact.defaultProps = {
    
};

export default SelectContact;