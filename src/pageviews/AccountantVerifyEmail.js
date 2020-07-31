// Core imports
import React, { Component } from 'react';
import { CSSReset } from '@chakra-ui/core';
import { ThemeProvider } from 'styled-components';
import { Theme } from '../Theme';

//Import Component
import Header from '../components/subcomponent/Header'
import AccountantVerifyEmailContainer from  '../containers/AccountantVerifyEmailContainer'


// App
export default class AccountantVerifyEmail extends Component {
	constructor(props) {
		super(props);
		this.state = {
			apiMessage: '',
			message: ''
		};
	}



	componentDidMount() {
		if (localStorage.getItem('userToken') !== '' && localStorage.getItem('userToken') !== null ) {
			this.props.history.push(`/accountantdashboard`)
		}
	}
	componentDidMount() {
		
	}
	render () {
		return (
			<ThemeProvider theme={Theme}>
				<CSSReset />
				<Header />
				<AccountantVerifyEmailContainer />				
			</ThemeProvider>
		);
	}
}
