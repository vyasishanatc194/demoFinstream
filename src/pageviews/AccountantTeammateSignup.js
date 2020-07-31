// Core imports
import React, { Component } from 'react';
import { CSSReset } from '@chakra-ui/core';
import styled, { ThemeProvider } from 'styled-components';
import { Theme, AccountantStyles } from '../Theme';

// CSS imports
import '../styles.css';

// Image imports
import logoFinstream from '../assets/global_img/logo-finstream.svg';

// Chakra-UI import components
import {
	Input,
	FormLabel,
	Link,
	Flex,
	Image,
	Heading,
	InputGroup,
	InputLeftAddon,
	InputRightElement,
	Icon,
	Text
} from '@chakra-ui/core';

const PrimaryButton = styled.button`
	color: white;
	font-weight: bold;
	padding: 20px;
	background-color: ${(props) => props.theme.colours.green};
	width: auto;
	margin-top: 20px;
	margin-bottom: 30px;
	border-radius: 3px;
	transition: 0.6s;
	&:hover {
		background-color: #70da39;
		transition: 0.4s;
	}
`;

const Wrapper = styled.div`
	background-color: ${Theme.colours.background};
	display: flex;
	justify-content: center;
`;

// App
export default class AccountantTeammateSignup extends Component {
	render () {
		return (
			<ThemeProvider theme={Theme}>
				<CSSReset />
				<Wrapper>
					<Flex
						flexDirection='column'
						width='570px'
						padding='50px'
						mt='100px'
						mb='100px'
						alignSelf='flex-start'
						backgroundColor='#fff'>
						<Image src={logoFinstream} mb='30px' />

						<Heading fontSize='18px' mb='40px' color='#3C4C62' textAlign='center'>
							Dejan (dejan@montgomeryaccountants.com.au) has invited you to join Finstream. Join now to
							start collaborating.
						</Heading>
						<form style={{ display: 'flex', flexDirection: 'column' }}>
							<FormLabel htmlFor='FirstName' style={AccountantStyles.formLabel}>
								First name
							</FormLabel>
							<Input placeholder='FirstName' style={AccountantStyles.input} />

							<FormLabel htmlFor='LastName' style={AccountantStyles.formLabel}>
								Last name
							</FormLabel>
							<Input placeholder='LastName' style={AccountantStyles.input} />

							<FormLabel htmlFor='Password' style={AccountantStyles.formLabel}>
								Password
							</FormLabel>
							<Input placeholder='Password' type={'password'} style={AccountantStyles.input} />

							<FormLabel htmlFor='ConfirmPassword' style={AccountantStyles.formLabel}>
								Confirm password
							</FormLabel>
							<InputGroup>
								<Input placeholder='ConfirmPassword' type={'password'} style={AccountantStyles.input} />
								<InputRightElement children={<Icon name='check' color='green.500' mt='10px' />} />
							</InputGroup>

							<FormLabel htmlFor='MobileNumber' style={AccountantStyles.formLabel}>
								Mobile number
							</FormLabel>
							<InputGroup>
								<InputLeftAddon children='+61' pt='25px' pb='25px' />
								<Input
									type='tel'
									roundedLeft='0'
									placeholder='phone number'
									type='number'
									style={AccountantStyles.input}
								/>
							</InputGroup>

							<PrimaryButton>Get started</PrimaryButton>
						</form>
						<Text style={Theme.text}>
							Already using Finstream?{' '}
							<Link href='https://www.finstream.app/login.php' isExternal style={Theme.link}>
								Login
							</Link>
						</Text>
						<br />
						<Text style={Theme.text}>
							By clicking ‘Get Started’, I agree to the{' '}
							<Link href='https://www.finstream.app/privacypolicy.html' isExternal style={Theme.link}>
								Privacy Policy
							</Link>{' '}
							and{' '}
							<Link href='https://www.finstream.app/termsofservice.html' isExternal style={Theme.link}>
								Terms of Service
							</Link>
						</Text>
					</Flex>
				</Wrapper>
			</ThemeProvider>
		);
	}
}
