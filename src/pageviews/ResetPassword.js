// Core imports
import React, { Component } from 'react';
import { CSSReset } from '@chakra-ui/core';
import  { ThemeProvider } from 'styled-components';
import { Theme} from '../Theme';


// Image imports
import logoFinstream from '../assets/global_img/logo-finstream.svg';
import sideBannerTitle from '../assets/accountant_img/side-banner-title.svg';

//Import Component
import Header from '../components/subcomponent/Header'
import ResetPasswordContainer from '../containers/ResetPasswordContainer'

// Chakra-UI import components
import {  Image } from '@chakra-ui/core';



// App
export default class ResetPassword extends Component {
	handleRedirect = () => {
		this.props.history.push(`/`)
	}
	render () {
		return (
			<ThemeProvider theme={Theme}>
				<CSSReset />
				<Header />
				<div id='accountantLogin'>
					<div className='sideBanner'>
						<Image src={logoFinstream} mt='120px' onClick={this.handleRedirect} />
						<Image src={sideBannerTitle} mt='50px' />
					</div>
					<ResetPasswordContainer />
					
				</div>
			</ThemeProvider>
		);
	}
}
