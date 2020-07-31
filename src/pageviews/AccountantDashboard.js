// Core imports
import React, { Component } from 'react';
import { CSSReset } from '@chakra-ui/core';
import  { ThemeProvider } from 'styled-components';
import { Theme, AccountantStyles } from '../Theme';

// CSS imports
import '../styles.css';

// Image imports
import logoFinstream from '../assets/global_img/logo-finstream.svg';

// Chakra-UI import components
import { Image, Tabs, TabList, TabPanels, Tab, TabPanel, Heading } from '@chakra-ui/core';

// Custom compontents
import UserTeamMatesContainer from '../containers/UserTeamMatesContainer';
import InviteCustomerContainer from '../containers/InviteCustomerContainer';
import PendingCustomersContainer from '../containers/PendingCustomersContainer';

// App
export default class AccountantDashboard extends Component {


	constructor(props) {
        super(props);
        this.state = {
            isLoggedIn:false,
            apiMessage: '',
            message: ''
        };
    }



	componentDidMount() {
        
        if (localStorage.getItem('userToken') !== '' && localStorage.getItem('userToken') !== null) {
            this.setState({ isLoggedIn: true });
        } else {
            this.setState({ apiMessage: 'error', message: 'You can not view this page, First register your self then you will redirect here' })
            setTimeout(function () {
                this.props.history.push(`/accountantlogin`)
            }.bind(this), 2000);
        }
	}
	

	render () {
		return (
			<ThemeProvider theme={Theme}>
				<CSSReset />
				<div className='accountantwrapper'>
					<div className='container' id='header'>
						<Image src={logoFinstream} />
						<UserTeamMatesContainer isLoggedIn={this.state.isLoggedIn} />
					</div>

					<div className='container'>
						<Tabs pt='40px'>
							<TabList color='#B1B7C2'>
								<Tab>Active Customers</Tab>
								<Tab>Invite</Tab>
							</TabList>
							<TabPanels>
								<TabPanel className='tabcontent'>
									<Heading style={AccountantStyles.sectionheading}>Active customers</Heading>
								</TabPanel>
								<TabPanel className='tabcontent'>
									<Heading style={AccountantStyles.sectionheading}>Invite a new customer</Heading>
									<InviteCustomerContainer />
									<Heading style={AccountantStyles.sectionheading}>Pending...</Heading>
									<PendingCustomersContainer />
								</TabPanel>
							</TabPanels>
						</Tabs>
					</div>
				</div>
			</ThemeProvider>
		);
	}
}
