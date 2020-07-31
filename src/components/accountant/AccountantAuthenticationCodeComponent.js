// Core imports
import React, { Component } from 'react';
import styled from 'styled-components';
import { Theme, AccountantStyles } from '../../Theme';
import _ from 'lodash';

// Image imports
import logoFinstream from '../../assets/global_img/logo-finstream.svg';
import verifyEmailBanner from '../../assets/accountant_img/verify-email-banner.svg';

// Chakra-UI import components
import {Input, Link, Flex, Image, Heading, Text, Alert,AlertIcon, Spinner } from '@chakra-ui/core';
//Import Api Url and Data
import { getUrl } from '../../services/network/urls';
import { post } from '../../services/network/requests';

import toastr from 'toastr'
import 'toastr/build/toastr.min.css'

const Wrapper = styled.div`
	background-color: ${Theme.colours.background};
	display: flex;
	justify-content: center;
`;



export class AccountantVerifyEmailComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phone: '',
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



    componentDidMount() {
        if (localStorage.getItem('userDetail') !== '' && localStorage.getItem('userDetail') !== null){
            let userDetail = JSON.parse(localStorage.getItem('userDetail'));
            this.setState({ phone : userDetail.phone });
        }else{
            this.setState({ apiMessage: 'error', message: 'You can not view this page, First register your self then you will redirect here' })
            setTimeout(function () {
                this.props.history.push(`/accountantsignin`)
            }.bind(this), 2000);
        }
    }

    onInputChangeHandler = (e) => {
        const { value, name } = e.target;
        this.setState({ [name]: value }, () => {
            if(name === 'code'){
                
                if (value === '') {
                    this.setState({ [name + 'Error']: _.startCase(name) + " is requied" })

                } else {
                    this.setState({ [name + 'Error']: '' })

                }
                if(value.length > 5){
                    this.handleSubmit()
                }
            }
            
        });
    }
    

    handleSubmit = () => {
        let data = {
            code : this.state.code
        }
        this.props.handlerLoader();
        const url = getUrl("authVerification");
        post(url, data,true)
            .then((res) => {
                console.log(res)
                const { data: { code, status, message, result } } = res;
                switch (code) {
                    case 200:
                        if (status) {
                            // this.setState({ apiMessage: 'success', message: 'Account Verified Successfully, You will be redirect soon to dashboard' })
                            toastr.success(message)
                            localStorage.setItem("userDetail", '');
                            localStorage.setItem("userTokenTemp", false);
                            localStorage.setItem("userToken", result.access_token);
                            if (localStorage.getItem('keepLogin')){
                                var date = new Date();
                                date.setDate(date.getDate() + 3);
                                localStorage.setItem('lastclear', date.getTime());
                                localStorage.setItem('keepLogin',false)
                            }
                            setTimeout(function () {
                                this.props.handlerLoader();
                                this.props.history.push(`/accountantdashboard`)
                            }.bind(this), 5000);
                        }
                        break;
                    case 400:
                        this.setState({ apiMessage: 'error', message: message })
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

    handleRedirect = () => {
        this.props.history.push(`/`)
    }

    render() {
        return (
            <React.Fragment>
                {this.props.loader && <div className="loader">
                    <Spinner />
                </div>}
                <Wrapper>
                    <Flex
                        flexDirection='column'
                        width='570px'
                        flex-grow='1'
                        padding='50px'
                        mt='100px'
                        mb='100px'
                        alignSelf='flex-start'
                        backgroundColor='#fff'>
                        
                        <Image src={logoFinstream} mb='30px'  onClick={this.handleRedirect} />
                        <Heading style={AccountantStyles.h1} mb='30px' textAlign='center'>
                            Check your phone!
						</Heading>
                        
                        {this.state.apiMessage !== '' && <Alert status={this.state.apiMessage}>
                            <AlertIcon />
                            {this.state.message}
                        </Alert>}
                        
                        <Text style={Theme.text}>
                           For security measures, we've sent a 6-digit login code to 
                            <Link style={Theme.link}>"{this.state.phone}"</Link>
                        </Text>
                        
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
                            Keep this window open while checking for your code. 
						</Text>
                        <Image src={verifyEmailBanner} mt='50px' mb='10px' />
                    </Flex>
                </Wrapper>
            </React.Fragment>
        );
    }
}

export default AccountantVerifyEmailComponent;
