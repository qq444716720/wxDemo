import React from 'react'
import { Link } from 'react-router-dom';
require('styles/member/Contact.scss')


class Contact extends React.Component {

    constructor() {
        super()
        this.state = {
            contactsId: '',
            contactsName: '',
            mobile: ''
        }
    }

    componentDidMount() {
        let contactsId = localStorage.getItem('selectedContactsId');
        if(!contactsId){
            contactsId = '';
        }
        fetch('http://192.168.70.238:8001/member/contacts/contacts_getContactsOne.do', {
			method: 'POST',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			body: 'contactsId=' + contactsId
		}).then(response => response.json()).then(json => {
            localStorage.setItem('selectedContactsId', json.contactsId);
			this.setState({
                contactsId: json.contactsId,
				contactsName: json.contactsName,
                mobile: json.mobile
			});
		});
    }

    render() {
        return (
            <div className="contact">
                <div className="top">
                    <div className="title">联系人</div>
                    <Link to={'/selectContact'}><div className="select">选择联系人</div></Link>
                </div>
                <div className="item">
                    <span>姓名：</span>
                    <input type="text" readOnly className="person-name" value={this.state.contactsName} />
                </div>
                <div className="item">
                    <span>手机：</span>
                    <input type="text" readOnly className="person-name" value={this.state.mobile} />
                </div>
            </div>
        )
    }
}

Contact.defaultProps = {
    
};

export default Contact;