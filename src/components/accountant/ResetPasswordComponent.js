import React, { Component } from 'react';
import styled from 'styled-components';
import { Theme, AccountantStyles } from '../../Theme';
import _ from 'lodash';
import { Link } from 'react-router-dom'
// Chakra default components
import {
    Input, FormLabel, Flex, Heading,   Text, FormControl, FormErrorMessage, Alert,
    AlertIcon , Spinner} from '@chakra-ui/core';
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

export class ResetPasswordComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            apiMessage: '',
            message: '',
            emailError: '',
            
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
            if (name === 'email') {
                
                if (value === '') {
                    this.setState({ [name + 'Error']: _.startCase(name) + " is requied" })

                } else {
                    this.setState({ [name + 'Error']: '' })

                }
                
            }
        });
    }


    validateField = (name, value) => {
        if (name === 'email') {
            if (value === '') {
                this.setState({ [name + 'Error']: _.startCase(name) + " is requied" })

            } else {
                this.setState({ [name + 'Error']: '' })
            }
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
           
        }

        let isValid = this.isFormValid(ValidateData)
        if (isValid) {

            const url = getUrl("forgotPassword");
            this.props.handlerLoader();
            post(url, ValidateData)
                .then((res) => {
                    console.log(res)
                    const { data: { code, status, message,  } } = res;
                    switch (code) {
                        case 200:
                            if (status) {
                                // this.setState({ apiMessage: 'success', message: 'Password Reset successfully, Please check your email and Login here.' })
                                localStorage.clear();
                                toastr.success(message)
                                setTimeout(function () {
                                    this.props.handlerLoader();
                                    this.props.history.push(`/accountantlogin`)
                                }.bind(this), 5000);
                            }
                            break;
                        case 400:
                            this.props.handlerLoader();
                            toastr.error(message)
                            this.setState({ emailError: message })
                           
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
                    <Link to='/accountantsignup' color='#0072FF'>
                        Sign up now
                    </Link>
                </Text>
                
                <Flex flexDirection='column' width='440px' mt='185px'>
                    {this.state.apiMessage !== '' && <Alert status={this.state.apiMessage}>
                        <AlertIcon />
                        {this.state.message}
                    </Alert>}
                    <Heading style={AccountantStyles.h1} mb='20px' fontWeight='700'>
                        Reset Your Password
							</Heading>
                    <FormControl isInvalid={this.state.emailError !== ''}>
                        <FormLabel htmlFor='Email address' style={AccountantStyles.formLabel}>
                            Your email address
                        </FormLabel>
                        <Input name="email" onChange={this.onInputChangeHandler} placeholder='Email address' style={AccountantStyles.input} />
                        <FormErrorMessage>{this.state.emailError}</FormErrorMessage>
                    </FormControl>
                    <Text style={Theme.text} mb='15px'>
                        By clicking the below button, an email will be sent to above email address, which will reset and provide a new password that can be changed at any time once you sign into
                        Finstream.
							</Text>
                    <PrimaryButton mb='10px' onClick={this.handleSubmit}>Reset password</PrimaryButton>
                    <Link to='/accountantlogin' style={Theme.link}>Return to login</Link>
                </Flex>
            </div>

        );
    }
}

export default ResetPasswordComponent;
