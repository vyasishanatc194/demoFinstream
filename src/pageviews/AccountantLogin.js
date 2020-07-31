// Core imports
import React, { Component } from 'react';
import { CSSReset } from '@chakra-ui/core';
import  { ThemeProvider } from 'styled-components';
import { Theme } from '../Theme';

// Chakra default components
import {  Flex } from '@chakra-ui/core';
// Image imports
import logoFinstream from '../assets/global_img/logo-finstream.svg';
import sideBannerTitle from '../assets/accountant_img/side-banner-title.svg';

// Chakra-UI import components
import {  Image } from '@chakra-ui/core';

// Custom compontents
import LoginContainer from '../containers/LoginContainer'
import Header from '../components/subcomponent/Header'

// App
export default class Login extends Component {
	handleRedirect = () => {
		this.props.history.push(`/`)
	}
	render () {
		return (
			<ThemeProvider theme={Theme}>
				<CSSReset />
				<Header />
				<Flex id='accountantLogin'>
					<div className='sideBanner'>
						<Image src={logoFinstream} mt='120px' onClick={this.handleRedirect}/>
						<Image src={sideBannerTitle} mt='50px' />
					</div>
					<LoginContainer />
					
				</Flex>
			</ThemeProvider>
		);
	}
}
