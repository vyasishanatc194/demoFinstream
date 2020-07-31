import React, { Component } from 'react';
import styled from 'styled-components';
import { Theme, AccountantStyles } from '../../Theme';
import _ from 'lodash';
import { Link } from 'react-router-dom'
// Chakra default components
import {
	Input, FormLabel, Flex, Heading, Checkbox,  Text, FormControl, FormErrorMessage, Alert,
	AlertIcon, Spinner} from '@chakra-ui/core';
//Import Api Url and Data
import { getUrl } from '../../services/network/urls';
import { post } from '../../services/network/requests';
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'

const PrimaryButton = styled.button`
	color: white;
	font-weight: bold;
	padding: 20px;
	background-color: ${(props) => props.theme.colours.finstreamBlue};
	margin-top: 10px;
	border-radius: 3px;
	transition: 0.6s;
	&:hover {
		background-color: #2b8aff;
		transition: 0.4s;
	}
`;

export class LoginFormComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			apiMessage: '',
			message: '',
			emailError: '',
			passwordError: '',
			keepLogin:true,
		};
		
		toastr.options = {
			positionClass: 'toast-top-right',
			hideDuration: 300,
			timeOut: 2000
		}
	}
	onInputChangeHandler = (e) => {
		const { value, name } = e.target;
		this.setState({ [name]: value }, () => {
			switch (name) {
				case 'email':
				case 'password':
					if (value === '') {
						this.setState({ [name + 'Error']: _.startCase(name) + " is requied" })

					} else {
						this.setState({ [name + 'Error']: '' })

					}
					break;
				default:
					break;
			}
		});
	}
	
	handleCheckBox= () => {
		this.setState({ keepLogin: !this.state.keepLogin})
	}

	validateField = (name, value) => {
        switch (name) {
            case 'email':
            case 'password':
                if (value === '') {
                    this.setState({ [name + 'Error']: _.startCase(name) + " is requied" })
                    return false
                } else {
                    this.setState({ [name + 'Error']: '' })
                    return true;
                }
            default:
                return true;
        }
    }

	isFormValid = (data) => {
		let isValid = true
		for (let [key, value] of Object.entries(data)) {
			let validation = this.validateField(key, value)
			if (isValid) {
				isValid = validation;
			}

		}
		return isValid
	}
	handleSubmit = () => {
		let ValidateData = {
			email: this.state.email,
			password: this.state.password,
		}

		let isValid = this.isFormValid(ValidateData)
		if (isValid) {
			this.props.handlerLoader();
			const url = getUrl("signin");
			post(url, ValidateData)
			.then((res) => {
				console.log(res)
				const { data: { code, status, message, result } } = res;
				switch (code) {
					case 200:
						if (status) {
							// this.setState({ apiMessage: 'success', message: 'Login Successfull, We have send you and authentication code on your registered mobile no.' })
							localStorage.setItem("userDetail", JSON.stringify(result));
							localStorage.setItem("userToken", result.access_token);
							localStorage.setItem("userTokenTemp", true);
							localStorage.setItem("keepLogin", this.state.keepLogin);
							toastr.success(message)
							setTimeout(function () {
								this.props.handlerLoader();
								this.props.history.push(`/two-factor-auth`)
							}.bind(this), 5000);
						}
						break;
					case 400:
						if (message.includes("Password")){
							this.setState({ passwordError: message })
						} else if (message.includes("User")){
							this.setState({ emailError: message })
						}
						toastr.error(message)
						this.props.handlerLoader();
						break;
					default:
						this.props.handlerLoader();
						break;
				}
			})
			.catch((err) => {
				this.props.handlerLoader();
				console.log(err)
			})
		}
	}
	render() {
		return (
			<div className='loginContainer'>
				{this.props.loader && <div className="loader">
					<Spinner />
				</div>}
				<Text className='signupPlug' style={Theme.text}>
					Not a registered user?{' '}
					<Link to='/accountantsignup' style={Theme.link}>
						Sign up now
					</Link>
				</Text>
				{/* Import Login component */}
				<Flex flexDirection='column' width='440px' mt='185px'>
					{this.state.apiMessage !== '' && <Alert status={this.state.apiMessage}>
						<AlertIcon />
						{this.state.message}
					</Alert>}
					<Heading style={AccountantStyles.h1} mb='30px' fontWeight='700'>
						Sign into Finstream
					</Heading>
					<FormControl isInvalid={this.state.emailError !== ''}>
						<FormLabel htmlFor='Email address' style={AccountantStyles.formLabel}>
							Your email address
						</FormLabel>
						<Input name="email" onChange={this.onInputChangeHandler} placeholder='Email address' style={AccountantStyles.input} />
						<FormErrorMessage>{this.state.emailError}</FormErrorMessage>
					</FormControl>
					
					<FormControl isInvalid={this.state.passwordError !== ''}>
						<FormLabel htmlFor='Password' style={AccountantStyles.formLabel}>
							Password
                                </FormLabel>
						<Input name="password" onChange={this.onInputChangeHandler} placeholder='Password' type={'password'} style={AccountantStyles.input} />
						<FormErrorMessage>{this.state.passwordError}</FormErrorMessage>
					</FormControl>

					<PrimaryButton onClick={this.handleSubmit}>Sign in</PrimaryButton>

					<Flex flexDirection='row' width='440px' mt='20px'>
						<Checkbox onClick={this.handleCheckBox}defaultIsChecked style={Theme.text}>
							Keep me logged in for 3 day(s)
					</Checkbox>
						<Link to='/resetpassword' style={Theme.link} ml='20px'>
							Forgot your password?
						</Link>
					</Flex>
				</Flex>
			</div>

		);
	}
}

export default LoginFormComponent;


