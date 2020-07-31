// Core imports
import React, { Component } from 'react';
import { CSSReset,Spinner } from '@chakra-ui/core';
import { ThemeProvider } from 'styled-components';
import { Theme } from '../Theme';

// Import Components
import Header from '../components/subcomponent/Header'
import AccountantSignUpContainer from '../containers/AccountantSignUpContainer'
// App
export default class AccountantSignup extends Component {
	componentDidMount() {
		if (localStorage.getItem('userToken') !== '' && localStorage.getItem('userToken') !== null){
			this.props.history.push(`/accountantdashboard`)
		}
	}
	render () {
		return (
			<ThemeProvider theme={Theme}>
				<CSSReset />
				<Header isLoggedIn={false}/>
				<AccountantSignUpContainer />
			</ThemeProvider>
		);
	}
}
