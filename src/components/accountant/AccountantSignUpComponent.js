/* eslint-disable jsx-a11y/anchor-is-valid */
// Core imports
import React, { Component } from 'react';
import styled from 'styled-components';
import { Theme, AccountantStyles } from '../../Theme';
import _ from 'lodash';

// Image imports
import logoFinstream from '../../assets/global_img/logo-finstream.svg';
import iconMoreInfo from '../../assets/accountant_img/icon-moreinfo.svg';
import { Link } from 'react-router-dom'
// Chakra-UI import components
import {
    Input,
    FormLabel,
    
    Flex,
    Image,
    Heading,
    Select,
    InputGroup,
    FormControl,
    FormErrorMessage,
    InputLeftAddon,
    InputRightElement,
    Icon,
    Text,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    Alert,
    AlertIcon,
    Spinner
} from '@chakra-ui/core';

import toastr from 'toastr'
import 'toastr/build/toastr.min.css'

//Import Api Url and Data
import { getUrl } from '../../services/network/urls';
import {  post } from '../../services/network/requests';
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



export class AccountantSignUpComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName:'',
            lastName: '',
            email: '',
            password: '',
            cpassword: '',
            phone: '',
            businessName: '',
            location: 'Australia',
            companyDomain: '',
            firstNameError : '',
            lastNameError : '',
            emailError : '',
            passwordError : '',
            cpasswordError : '',
            phoneError : '',
            businessNameError : '',
            locationError : '',
            companyDomainError : '',
            apiMessage : '',
            message : '',
            foundRef:false,
            ref_user_name : '',
            ref_user_email : '' ,
        };
        toastr.options = {
            positionClass: 'toast-top-right',
            hideDuration: 300,
            timeOut: 2000
        }
    }

   

    componentDidMount(){
        this.checkReferenceUser()
    }

    checkReferenceUser = () => {
        const query = new URLSearchParams(this.props.location.search);
        const token = query.get('token');
        const type =  (query.get('type') != undefined && query.get('type') != null ) ? query.get('type') : '' ;

        console.log(token , type)
        if(token){
            let data = { token: token , type:type }
            const url = getUrl("getUserFromRegToken");
			post(url, data)
			.then((res) => {
				console.log(res)
				const { data: { code, status, result } } = res;
				if (code === 200) {
					
                    if (status) {
                        this.setState({
                            foundRef : true ,
                            email : result.registration_email,
                            phone : result.registration_phone, 
                            firstName : result.registration_name ,
                            ref_user_name : result.user_name,
                            ref_user_email : result.user_email
                        })
                    }
					
				}
			})
			.catch((err) => {
			})
        }
    }

    onInputChangeHandler = (e) => {
        
        const { value, name } = e.target;
        this.setState({ [name]: value }, () => {
            switch (name) {
                case 'firstName':
                case 'lastName':
                case 'email':
                case 'password':
                case 'phone':
                case 'location':
                case 'companyDomain':
                    if (value === '') {
                        this.setState({ [name + 'Error']: _.startCase(name) + " is requied" })

                    } else {
                        this.setState({ [name + 'Error']: '' })

                    }
                    break;
                case 'businessName':
                    if (value === '') {
                        this.setState({ [name + 'Error']: _.startCase(name) + " is requied", companyDomain: '' })

                    } else {
                        let companyDomain = value.replace(/\s/g, '') + '.finstream.app'
                        this.setState({ [name + 'Error']: '', companyDomain: companyDomain })

                    }
                    break;
                    
                case 'cpassword':
                    if (value === '') {
                        this.setState({ [name + 'Error']: _.startCase(name) + " is requied" })

                    } else if(this.state.password !== value){
                        this.setState({ [name + 'Error']: 'Password and Confirm Password Should Match' })

                    }else {
                        this.setState({ [name + 'Error']: '' })

                    }
                    break;
                default:
                    break;
            }
        });
    }
    validateField = (name, value) => {
        switch (name) {
            case 'firstName':
            case 'lastName':
            case 'email':
            case 'password':
            case 'phone':
            case 'location':
            case 'companyDomain':
                if (value === '') {
                    this.setState({ [name + 'Error']: _.startCase(name) + " is requied" })
                    return false
                } else {
                    this.setState({ [name + 'Error']: '' })
                    return true;
                }
            case 'businessName':
                if (value === '') {
                    this.setState({ [name + 'Error']: _.startCase(name) + " is requied" })
                    return false
                } else {
                    let companyDomain = value.replace(/\s/g, '') +'.finstream.app'
                    this.setState({ [name + 'Error']: '', companyDomain: companyDomain })
                    return true;
                }
                
            case 'cpassword':
                if (value === '') {
                    this.setState({ [name + 'Error']: _.startCase(name) + " is requied" })
                    return false
                } else if (this.state.password !== value) {
                    this.setState({ [name + 'Error']: 'Password and Confirm Password Should Match' })
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
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            password: this.state.password,
            phone: this.state.phone,
            cpassword: this.state.cpassword,
            businessName: this.state.businessName,
            location: this.state.location,
            companyDomain: this.state.companyDomain,
        }

       

        let ValidateDataWithRef = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            password: this.state.password,
            phone: this.state.phone,
            cpassword: this.state.cpassword,
        }

       
        let isValid = (this.state.foundRef === true) ? this.isFormValid(ValidateDataWithRef) : this.isFormValid(ValidateData) 

        if(isValid){
            let userData = {
                first_name: this.state.firstName,
                last_name: this.state.lastName,
                email: this.state.email,
                password: this.state.password,
                phone: '+61'+this.state.phone,
                business_name: this.state.businessName,
                location: this.state.location,
                company_domain: this.state.companyDomain,
            }
            this.props.handlerLoader();
            const url = getUrl("signup");
            post(url, userData)
                .then((res) => {
                    console.log(res)
                    const { data: { code, status, message,result } } = res;
                    switch (code) {
                        case 200:
                            if (status) {
                                // this.setState({ apiMessage: 'success', message: 'Registration Successfull, Please verify your email.' })
                                toastr.success(message)
                                localStorage.setItem("userDetail", JSON.stringify(result));
                                setTimeout(function () {
                                    this.props.history.push(`/accountantverifyemail`)
                                    this.props.handlerLoader();
                                }.bind(this), 3000);
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
                    console.log(err)
                    this.props.handlerLoader();
                })
        } 
    }
    handleRedirect = () =>{
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

                        {(this.state.foundRef === true) ?
                        <Heading style={AccountantStyles.h5} mb='20px' textAlign='center'>
                         {this.state.ref_user_name} {'('+this.state.ref_user_email+')'} <br />has invited you to join Finstream. Join now to start collaborating.
                        </Heading>
                        : 
                        <Heading style={AccountantStyles.h1} mb='40px' textAlign='center'>
                        Just one more step towards <br />your free trial
                        </Heading>
                        }
                        
                       
                        {this.state.foundRef === false &&
                            <FormControl isInvalid={this.state.emailError !== ''}>
                                <FormLabel htmlFor='Email address' style={AccountantStyles.formLabel}>
                                    Your email address
                                </FormLabel>
                                <Input name="email" onChange={this.onInputChangeHandler} placeholder='Email address' style={AccountantStyles.input} />
                                <FormErrorMessage>{this.state.emailError}</FormErrorMessage>
                            </FormControl>}
                            
                            <FormControl isInvalid={this.state.firstNameError !== ''}>
                                <FormLabel htmlFor='FirstName' style={AccountantStyles.formLabel}>
                                    First name
                                </FormLabel>
                                <Input name="firstName" onChange={this.onInputChangeHandler} placeholder='FirstName' style={AccountantStyles.input} />
                                <FormErrorMessage>{this.state.firstNameError}</FormErrorMessage>
                            </FormControl>
                            
                            <FormControl isInvalid={this.state.lastNameError !== ''}>
                                <FormLabel htmlFor='LastName' style={AccountantStyles.formLabel}>
                                    Last name
                                </FormLabel>
                                <Input name="lastName" onChange={this.onInputChangeHandler} placeholder='LastName' style={AccountantStyles.input} />
                                <FormErrorMessage>{this.state.lastNameError}</FormErrorMessage>
                            </FormControl>

                            <FormControl isInvalid={this.state.passwordError !== ''}>
                                <FormLabel htmlFor='Password' style={AccountantStyles.formLabel}>
                                    Password
                                </FormLabel>
                                <Input name="password" onChange={this.onInputChangeHandler} placeholder='Password' type={'password'} style={AccountantStyles.input} />
                                <FormErrorMessage>{this.state.passwordError}</FormErrorMessage>
                            </FormControl>

                            <FormControl isInvalid={this.state.cpasswordError !== ''}>
                                <FormLabel htmlFor='ConfirmPassword' style={AccountantStyles.formLabel}>
                                    Confirm password
                                </FormLabel>
                                <InputGroup>
                                    <Input name="cpassword" onChange={this.onInputChangeHandler} placeholder='ConfirmPassword' type={'password'} style={AccountantStyles.input} />
                                    <InputRightElement children={<Icon name='check' color='green.500' mt='10px' />} />
                                </InputGroup>
                                <FormErrorMessage>{this.state.cpasswordError}</FormErrorMessage>
                            </FormControl>

                            {this.state.foundRef === false &&
                            <FormControl isInvalid={this.state.locationError !== ''}>
                                <FormLabel htmlFor='MobileNumber' style={AccountantStyles.formLabel}>
                                    Location
                                </FormLabel>
                                <FormControl>
                                    <Select
                                        id='country'
                                        placeholder='Australia'
                                        isDisabled
                                        style={AccountantStyles.select}
                                    />
                                    <FormErrorMessage>{this.state.locationError}</FormErrorMessage>
                                </FormControl>
                            </FormControl>}

                            <FormControl isInvalid={this.state.phoneError !== ''}>
                                <FormLabel htmlFor='MobileNumber' style={AccountantStyles.formLabel}>
                                    Mobile number
                                </FormLabel>
                                <InputGroup>
                                    <InputLeftAddon children='+61' pt='25px' pb='25px' />
                                    <Input
                                        name="phone"
                                        type='tel'
                                        roundedLeft='0'
                                        placeholder='phone number'
                                        onChange={this.onInputChangeHandler}
                                        style={AccountantStyles.input}
                                    />
                                </InputGroup>
                                <FormErrorMessage>{this.state.phoneError}</FormErrorMessage>
                            </FormControl>

                            {this.state.foundRef === false &&
                            <FormControl isInvalid={this.state.businessNameError !== ''}>
                                <FormLabel htmlFor='BusinessName' style={AccountantStyles.formLabel}>
                                    Business name
                                </FormLabel>
                                <Input name="businessName" onChange={this.onInputChangeHandler} placeholder='BusinessName' style={AccountantStyles.input} />
                                <FormErrorMessage>{this.state.businessNameError}</FormErrorMessage>
                            </FormControl>}

                            {this.state.foundRef === false &&
                            <FormControl isInvalid={this.state.companyDomainError !== ''}>
                                <FormLabel htmlFor='CompanyDomain' style={AccountantStyles.formLabel}>
                                    Business Subdomain
                                </FormLabel>
                                <InputGroup>
                                    <InputLeftAddon children='https://' pt='25px' pb='25px' />
                                    <Input name="companyDomain" isDisabled onChange={this.onInputChangeHandler} placeholder='.finstream.app' value={this.state.companyDomain} style={AccountantStyles.input} />
                                    <InputRightElement
                                        children={
                                            <Popover trigger='hover'>
                                                <PopoverTrigger>
                                                    <Image src={iconMoreInfo} mt='12px' />
                                                </PopoverTrigger>
                                                <PopoverContent
                                                    zIndex={4}
                                                    ml='-200px'
                                                    width='280px'
                                                    bg='white'
                                                    color='black'>
                                                    <PopoverHeader fontWeight='bold' color='#43495A'>
                                                        What is your Subdomain?
                                                    </PopoverHeader>
                                                    <PopoverBody color='#7887AC'>
                                                        Your business subdomain is the location where your customers will
                                                        signup and login to your app.
                                                    </PopoverBody>
                                                </PopoverContent>
                                            </Popover>
                                        }
                                    />
                                </InputGroup>
                                <FormErrorMessage>{this.state.companyDomainError}</FormErrorMessage>
                            </FormControl>}                            
                            <PrimaryButton onClick={this.handleSubmit}>Get started</PrimaryButton>
                        
                        <Text style={Theme.text}>
                            Already using Finstream?{' '}
                            <Link to='/accountantlogin' style={Theme.link}>
                                Login
                            </Link>
                        </Text>
                        <br />
                        <Text style={Theme.text}>
                            By clicking ‘Get Started’, I agree to the{' '}
                            <a href='/privacy-policy' rel="noopener noreferrer" style={Theme.link}>
                                Privacy Policy
                            </a>{' '}
                                and{' '}
                            <a href='/privacy-policy' rel="noopener noreferrer" style={Theme.link}>
                                Terms of Service
                            </a>
                        </Text>
                    </Flex>
                </Wrapper>
            </React.Fragment>
        );
    }
}

export default AccountantSignUpComponent;
