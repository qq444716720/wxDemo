import React from 'react'
import { NavBar, Icon , InputItem , List, Toast } from 'antd-mobile';
import QueueAnim from 'rc-queue-anim';

class UpdateContact extends React.Component {

    constructor() {
        super()
        this.state = {
            title: '新增择联系人',
            action: 'saveContactsInfo',
            hasPhoneError: false,
            hasNameError: false,
            hasEmailError: false,
            contactsId: '',
            name: '',
            phone: '',
            email: ''
        }
    }
    componentDidMount() {
        const { type } = this.props.match.params;
        if(type === 'update'){
            let item = JSON.parse(localStorage.getItem('editorContact'));
            this.setState({
                title: '修改联系人',
                name: item.contactsName,
                phone: item.mobile,
                email: item.email,
                contactsId: item.contactsId,
                action: 'updateContactsInfo'
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
    onEmailErrorClick = () => {
        if (this.state.hasEmailError) {
          Toast.info('请输入正确的邮箱', 1);
        }
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
    onEmailChange = (value) => {
        let regex = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
        if (!regex.test(value)) {
          this.setState({
            hasEmailError: true
          });
        } else {
          this.setState({
            hasEmailError: false
          });
        }
        this.setState({
            email: value
        });
    }
    

    render() {
        
        let { hasPhoneError, hasNameError, hasEmailError, name, phone, email, contactsId, action } = this.state;
        return (
            <div className="select-contact">
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.props.history.goBack()}
                    rightContent={[
                        <div onClick={() => {
                                if(hasPhoneError || hasNameError || hasEmailError || !name || !phone || !email){
                                    Toast.fail('请填写正确的信息', 1);
                                }else{
                                    Toast.loading('正在保存...', 0, () => {
                                        // console.log('Load complete !!!');
                                    });
                                    fetch(`http://127.0.0.1:8001/member/contacts/contacts_${action}.do`, {
                                        method: 'POST',
                                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                                        body: 'contactsName=' + name + '&mobile=' + phone.replace(/\s/g,'') + '&email=' + email + '&contactsId=' + contactsId
                                    }).then(response => response.json()).then(json => {
                                        Toast.hide();
                                        if(json.success){
                                            Toast.success(json.reason, 1);
                                            this.props.history.goBack()
                                        }else {
                                            Toast.fail(json.reason, 1);
                                        }
                                    });
                                }
                        }}>完成</div>
                    ]}
                >{this.state.title}</NavBar>
                <List>
                    <QueueAnim delay={300} className="queue-simple">
                    <InputItem key='1'
                        clear
                        placeholder="请输入姓名"
                        error={hasNameError}
                        onErrorClick={this.onNameErrorClick}
                        onChange={this.onNameChange}
                        value={this.state.name}
                        >姓名</InputItem>
                    <InputItem key='2'
                        type="phone"
                        clear
                        placeholder="请输入手机号"
                        error={hasPhoneError}
                        onErrorClick={this.onErrorClick}
                        onChange={this.onPhoneChange}
                        value={this.state.phone}
                        >手机</InputItem>
                    <InputItem key='3'
                        clear
                        placeholder="请输入邮箱"
                        error={hasEmailError}
                        onErrorClick={this.onEmailErrorClick}
                        onChange={this.onEmailChange}
                        value={this.state.email}
                        >邮箱</InputItem>
                    </QueueAnim>
                </List>
            </div>
        )
    }
}

UpdateContact.defaultProps = {
    
};

export default UpdateContact;