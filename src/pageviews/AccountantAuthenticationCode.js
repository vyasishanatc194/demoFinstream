// Core imports
import React, { Component } from 'react';
import { CSSReset } from '@chakra-ui/core';
import { ThemeProvider } from 'styled-components';
import { Theme } from '../Theme';

//Import Component
import Header from '../components/subcomponent/Header'
import AccountantAuthenticationCodeContainer from  '../containers/AccountantAuthenticationCodeContainer'


// App
export default class AccountantAuthenticationCode extends Component {
	constructor(props) {
		super(props);
		this.state = {
			apiMessage: '',
			message: ''
		};
	}



	componentDidMount() {
		if (localStorage.getItem('userToken') !== '' && !localStorage.getItem('userTokenTemp')) {
			this.props.history.push(`/accountantdashboard`)
		}
	}
	render () {
		return (
			<ThemeProvider theme={Theme}>
				<CSSReset />
				<Header />
				<AccountantAuthenticationCodeContainer />				
			</ThemeProvider>
		);
	}
}
