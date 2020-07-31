// Core imports
import React, { Component } from 'react';
import styled from 'styled-components';
import { Theme, AccountantStyles } from '../../Theme';
import _ from 'lodash';

// Chakra-UI import components
import {Input, Link, Flex, Image, Heading, Text, Alert,AlertIcon, Spinner } from '@chakra-ui/core';
//Import Api Url and Data
import { getUrl } from '../../services/network/urls';
import { post } from '../../services/network/requests';


// Image imports
import logoFinstream from '../../assets/global_img/logo-finstream.svg';
import verifyEmailBanner from '../../assets/accountant_img/verify-email-banner.svg';

const Verify = styled.div`
	background-color: ${Theme.colours.background};
	display: flex;
	justify-content: center;
`;


import toastr from 'toastr'
import 'toastr/build/toastr.min.css'

export class AccountantVerifyEmailComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            code : '',
            apiMessage:'',
            message:''
        };
        toastr.options = {
            positionClass: 'toast-top-right',
            hideDuration: 300,
            timeOut: 2000
        }
    }



    
    handleSubmit = () => {
        let data = {
            email : this.state.email,
            code : this.state.code
        }
        this.props.handlerLoader();
        const url = getUrl("verifyEmail");
        post(url, data)
            .then((res) => {
                console.log(res)
                const { data: { code, status, message, result } } = res;
                switch (code) {
                    case 200:
                        if (status) {
                            // this.setState({ apiMessage: 'success', message: 'Account Verified Successfully, You will be redirect soon to dashboard' })
                            toastr.success(message)
                            localStorage.setItem("userDetail", '');
                            localStorage.setItem("userToken", result.access_token);
                            setTimeout(function () {
                                this.props.handlerLoader();
                                this.props.history.push(`/accountantdashboard`)
                            }.bind(this), 5000);
                        }
                        break;
                    case 400:
                        this.props.handlerLoader();
                        toastr.error(message)
                        this.setState({ apiMessage: 'error', message: message })
                        break;
                    default:
                        break;
                }
            })
            .catch((err) => {
                console.log(err)
            })
        
    }

    onInputChangeHandler = (e) => {
        const { value, name } = event.target;
        this.setState({ [name]: value }, () => {
            if (name === 'code') {
                if (value === '') {
                    this.setState({ [name + 'Error']: _.startCase(name) + " is requied" })
                } else {
                    this.setState({ [name + 'Error']: '' })
                }
                if (value.length > 5) {
                    this.handleSubmit()
                }
            }
        });
    }

    handleRedirect = () => {
        this.props.history.push(`/`)
    }

    componentDidMount() {
        if (localStorage.getItem('userDetail') !== '' && localStorage.getItem('userDetail') !== null) {
            let userDetail = JSON.parse(localStorage.getItem('userDetail'));
            this.setState({ email: userDetail.email });
        } else {
            this.setState({ apiMessage: 'error', message: 'You can not view this page, First register your self then you will redirect here' })
            setTimeout(function () {
                this.props.history.push(`/accountantsignup`)
            }.bind(this), 2000);
        }
    }

    render() {
        return (
            <React.Fragment>
                {this.props.loader && <div className="loader">
                    <Spinner />
                </div>}
                <Verify>
                    <Flex
                        flexDirection='column'
                        width='570px'
                        flex-grow='1'
                        padding='50px'
                        mt='100px'
                        mb='100px'
                        alignSelf='flex-start'
                        backgroundColor='#fff'>
                        
                        <Image src={logoFinstream} mb='30px' onClick={this.handleRedirect}/>
                        {this.state.apiMessage !== '' && <Alert status={this.state.apiMessage}>
                            <AlertIcon />
                            {this.state.message}
                        </Alert>}
                        <Heading style={AccountantStyles.h1} mb='30px' textAlign='center'>
                            Check your email!
						</Heading>
                        <Text style={Theme.text}>
                            We’ve sent a 6-digit confirmation code to:{' '}
                            <Link style={Theme.link}>"{this.state.email}"</Link>
                        </Text>
                        <Text style={Theme.text}>This code will expire shortly. Please enter this code below.</Text>
                        <form>
                            <Input
                                style={AccountantStyles.input}
                                placeholder='6 digit code'
                                type='number'
                                height='80px'
                                pl='30px'
                                mt='20px'
                                mb='40px'
                                fontSize='24px'
                                max='6'
                                min='6'
                                name="code"
                                onChange={this.onInputChangeHandler}
                            />
                        </form>
                        <Text style={Theme.text}>
                            Keep this window open while checking for your code. <br />Remember to try your spam folder
							if you can’t see your email.
						</Text>
                        <Image src={verifyEmailBanner} mt='50px' mb='10px' />
                    </Flex>
                </Verify>
            </React.Fragment>
        );
    }
}

export default AccountantVerifyEmailComponent;
