import React from 'react'
import { NavBar, Icon , InputItem , List, Toast, ActionSheet, NoticeBar, DatePicker } from 'antd-mobile';
import QueueAnim from 'rc-queue-anim';
import moment from 'moment';

const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
let wrapProps;
if (isIPhone) {
  wrapProps = {
    onTouchStart: e => e.preventDefault(),
  };
}

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

const cardIdArr = {
    '二代身份证': 'identityCard',
    '护照': 'passportNo',
    '军官证': 'servicemanCardNo',
    '港澳通行证': 'eepHongkongMacaoNo',
    '台胞证': 'mtpTaiwanNo',
    '回乡证': 'mtpHongkongMacaoNo',
    '户口簿': 'householdRegisterNo',
    '出生证明': 'birthCertificate',
    '台湾通行证': 'passToTaiwanNo'
}

class UpdateTourist extends React.Component {

    constructor() {
        super()
        this.state = {
            hasPhoneError: false,
            hasNameError: false,
            hasCardIdError: false,
            title: '新增出行人',
            action: 'saveTourist',
            name: '',
            touristId: '',
            firstName: '',
            lastName: '',
            phone: '',
            cardId: '',
            cardType: '',
            cardTypeIs2: false,
            cardTypeIs1: true,
            date: ''
        }
    }

    componentDidMount() {
        const { type } = this.props.match.params;
        if(type === 'update'){
            let item = JSON.parse(localStorage.getItem('editorTourist'));
            if(item.cardType === '2'){
                this.setState({ cardTypeIs2: true });
            }else{
                this.setState({ cardTypeIs2: false });
            }
            if(item.cardType === '1'){
                this.setState({ cardTypeIs1: true });
            }else{
                this.setState({ cardTypeIs1: false });
            }
            let date = '';
            if(item.birthdate){
                date = new Date(item.birthdate);
            }
            this.setState({
                title: '修改出行人',
                action: 'updateTourist',
                firstName: item.firstName,
                lastName: item.lastName,
                touristId: item.touristId,
                phone: item.mobile,
                name: item.touristName,
                cardType: cardArr[item.cardType],
                cardId: item[cardIdArr[cardArr[item.cardType]]],
                date: date
            });
        }
    }

    onNameErrorClick = () => {
        if (this.state.hasNameError) {
          Toast.info('姓名不能为空', 1);
        }
    }
    onErrorClick = () => {
        if (this.state.hasPhoneError) {
          Toast.info('请输入正确的手机号', 1);
        }
    }
    onCardIdErrorClick = () => {
        if (this.state.hasCardIdError) {
          Toast.info('证件号码不能为空', 1);
        }
    }

    showActionSheet = () => {
        const BUTTONS = ['二代身份证', '护照', '军官证', '港澳通行证', '台胞证', '回乡证', '户口簿', '出生证明', '台湾通行证', '取消'];
        ActionSheet.showActionSheetWithOptions({
            options: BUTTONS,
            cancelButtonIndex: BUTTONS.length - 1,
            destructiveButtonIndex: BUTTONS.length - 1,
            message: '请选择证件类型',
            maskClosable: true,
            'data-seed': 'logId',
            wrapProps
        },
        (buttonIndex) => {
            if(buttonIndex != BUTTONS.length-1){
                this.setState({ cardType: BUTTONS[buttonIndex] });
                if(buttonIndex == 1){
                    this.setState({ cardTypeIs2: true });
                }else{
                    this.setState({ cardTypeIs2: false });
                }
                if(buttonIndex == 0){
                    this.setState({ cardTypeIs1: true });
                }else{
                    this.setState({ cardTypeIs1: false });
                }
                const { type } = this.props.match.params;
                if(type === 'update'){
                    let item = JSON.parse(localStorage.getItem('editorTourist'));
                    // console.log(cardIdArr[BUTTONS[buttonIndex]])
                    this.setState({
                        cardId: item[cardIdArr[BUTTONS[buttonIndex]]]
                    });
                }
            }
        });
    }
    onFirstNameChange = (value) => {
        value = value.replace(/(^\s*)/g, '');
        if (!value) {
          this.setState({
            hasNameError: true
          });
        } else {
          this.setState({
            hasNameError: false
          });
        }
        this.setState({
            firstName: value
        });
    }
    onLastNameChange = (value) => {
        value = value.replace(/(^\s*)/g, '');
        if (!value) {
          this.setState({
            hasNameError: true
          });
        } else {
          this.setState({
            hasNameError: false
          });
        }
        this.setState({
            lastName: value
        });
    }
    onNameChange = (value) => {
        value = value.replace(/(^\s*)/g, '');
        if (!value) {
          this.setState({
            hasNameError: true
          });
        } else {
          this.setState({
            hasNameError: false
          });
        }
        this.setState({
            name: value
        });
    }
    onPhoneChange = (value) => {
        let regex = /^((\+)?86|((\+)?86)?)0?1[3458]\d{9}$/;
        if (!regex.test(value.replace(/\s/g, ''))) {
          this.setState({
            hasPhoneError: true
          });
        } else {
          this.setState({
            hasPhoneError: false
          });
        }
        this.setState({
            phone: value
        });
    }
    onCardIdChange = (value) => {
        value = value.replace(/(^\s*)/g, '');
        if (!value) {
          this.setState({
            hasCardIdError: true
          });
        } else {
          this.setState({
            hasCardIdError: false
          });
        }
        this.setState({
            cardId: value
        });
    }
    

    render() {
        const { hasPhoneError, hasNameError, hasCardIdError, touristId, name, phone, cardId, cardType, cardTypeIs1, cardTypeIs2, firstName, lastName, date } = this.state;
        return (
            <div className="select-contact">
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.props.history.goBack()}
                    rightContent={[
                        <div onClick={() => {
                            let body = 'mobile=' + phone.replace(/\s/g,'');
                            if(hasPhoneError || hasNameError || hasCardIdError || !cardType || !phone || !cardId){
                                Toast.fail('请填写正确的信息', 1);
                            }else{
                                if(cardTypeIs1 && !name){
                                    Toast.fail('姓名不能为空', 1);
                                    return;
                                }else if(cardTypeIs1 && name){
                                    body += `&contactsName=${name}`;
                                }else{
                                    if(!date){
                                        Toast.fail('请选择出生日期', 1);
                                        return;
                                    }else{
                                        body += `&birthdate=${moment(date).format('YYYY-MM-DD')}`;
                                    }
                                }
                                if(cardTypeIs2 && !firstName && !lastName){
                                    Toast.fail('姓名不能为空', 1);
                                    return;
                                }else if(cardTypeIs2 && firstName && lastName){
                                    body += `&firstName=${firstName}&lastName=${lastName}`;
                                }
                                Toast.loading('正在保存...', 0, () => {
                                    // console.log('Load complete !!!');
                                });
                                fetch(`http://rap.taobao.org/mockjs/30890/tourist/tourist_${this.state.action}.do`, {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                                    body: body + '&'+cardIdArr[cardType]+ '=' + cardId + '&currCardNo=' + cardId + '&touristId=' + touristId
                                }).then(response => response.json()).then(json => {
                                    Toast.hide();
                                    if(json.success){
                                        Toast.success(json.msg, 2);
                                        this.props.history.goBack()
                                    }else {
                                        Toast.fail(json.msg, 2);
                                    }
                                });
                            }
                        }}>完成</div>
                    ]}
                >{this.state.title}</NavBar>
                <NoticeBar marqueeProps={{ loop: true, style: { padding: '0 7.5px' } }}>
                    请确认：您填写的姓名与出行人所持证件一致
                </NoticeBar>
                <List>
                    <QueueAnim delay={300} className="queue-simple">
                    {
                        this.state.cardTypeIs2 ?
                        <div>
                        <InputItem key='1'
                            clear
                            placeholder="Lastname,如ZHANG"
                            error={this.state.hasNameError}
                            onErrorClick={this.onNameErrorClick}
                            onChange={this.onFirstNameChange}
                            value={this.state.firstName}
                            >姓（英文）</InputItem>
                        <InputItem key='5'
                            clear
                            placeholder="Firstname,如SANFENG"
                            error={this.state.hasNameError}
                            onErrorClick={this.onNameErrorClick}
                            onChange={this.onLastNameChange}
                            value={this.state.lastName}
                            >名（英文）</InputItem>
                        </div>
                        :
                        <InputItem key='1'
                            clear
                            placeholder="请输入姓名"
                            error={this.state.hasNameError}
                            onErrorClick={this.onNameErrorClick}
                            onChange={this.onNameChange}
                            value={this.state.name}
                            >姓名</InputItem>
                    }
                    <InputItem key='2'
                        type="phone"
                        clear
                        placeholder="请输入手机号"
                        error={this.state.hasPhoneError}
                        onErrorClick={this.onErrorClick}
                        onChange={this.onPhoneChange}
                        value={this.state.phone}
                        >手机号码</InputItem>
                    <InputItem key='3'
                        placeholder="请选择证件类型"
                        value={this.state.cardType}
                        onClick={this.showActionSheet}
                        >证件类型</InputItem>
                    <InputItem key='4'
                        placeholder="请输入证件号码"
                        error={this.state.hasCardIdError}
                        onErrorClick={this.onCardIdErrorClick}
                        onChange={this.onCardIdChange}
                        value={this.state.cardId}
                        >证件号码</InputItem>
                    {
                        this.state.cardTypeIs1 ?
                        ''
                        :
                        <DatePicker key='6'
                            mode="date"
                            minDate={new Date('1930-01-01')}
                            maxDate={new Date()}
                            title="请选择出生日期"
                            value={this.state.date}
                            format="YYYY-MM-DD"
                            onChange={date => this.setState({ date })}
                            >
                            <List.Item arrow="horizontal">出身日期</List.Item>
                        </DatePicker>
                    }
                    </QueueAnim>
                </List>
            </div>
        )
    }
}

UpdateTourist.defaultProps = {
    
};

export default UpdateTourist;