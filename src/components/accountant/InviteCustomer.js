import React, { Component } from 'react';
import styled from 'styled-components';
import {  AccountantStyles } from '../../Theme';

// CSS imports
import '../../styles.css';

// Chakra-UI import components
import { Input, FormLabel, Flex, InputGroup, InputLeftAddon , Spinner} from '@chakra-ui/core';


//Import Api Url and Data
import { getUrl } from '../../services/network/urls';
import { get, post } from '../../services/network/requests';


import toastr from 'toastr'
import 'toastr/build/toastr.min.css'

const PrimaryButton = styled.button`
	color: white;
	font-weight: bold;
	background-color: ${(props) => props.theme.colours.green};
	margin-top: 27px;
	font-size: 14px;
	height: 54px;
	padding-left: 20px;
	padding-right: 20px;
	border-radius: 3px;
	transition: 0.6s;
	&:hover {
		background-color: #70da39;
		transition: 0.4s;
	}
`;

export class InviteCustomer extends Component {


	constructor(props) {
        super(props);
        this.state = {

			customerName:'',
			phone: '',
			email: '',

			customerNameError: '',
			phoneError : '',
			emailError: '',

			emailErrorMsg:'',
			isFormValid : false,

			
        };

        toastr.options = {
			positionClass: 'toast-top-right',
			hideDuration: 300,
			timeOut: 2000
		}
	}


	componentDidMount() {
		this.getPendingCustomersListing()
	}

	getPendingCustomersListing = () => {

		const url = getUrl("pendingCustomers");
		get(url, localStorage.getItem('userToken'))
			.then((res) => {
				console.log(res)
				const { data: { code, status,  result } } = res;
				if (code === 200) {
					if (status) {
						this.props.getPendingCustomersData(result.customers)
					}
				
				}
			})
			.catch((err) => {
				console.log(err)
			})

	}


	onInputChangeHandler = (e) => {
		const { value, name } = e.target;
		this.setState({ [name]: value }, () => {
			if (name === 'customerName') {
				if (value === '') {
					this.setState({ [name + 'Error']: true })
				} else {
					this.setState({ [name + 'Error']: false })
				}
			
			}
		});
	}

	isFormValid = (data) => {
		let isValid = true
		
		if (data.customerName === '') {
			this.setState({ ['customerNameError']: true })
			isValid = false  
		} else {
			this.setState({ ['customerNameError']: false })
		}

		if(data.phone === '' && data.email === ''){
			isValid = false 
			this.setState({ ['emailErrorMsg']: 'Either a phone number or email address is required' })
		}else{
			if(data.email.length > 0){
				if(this.validateEmail(data.email) === false ){
					isValid = false 
					this.setState({ ['emailError']: true })
				}else{
					this.setState({ ['emailError']: false })
				}
			}else{
				this.setState({ ['emailError']: false })
				this.setState({ ['phoneError']: false })
			}
			this.setState({ ['emailErrorMsg']: '' })
		}
		return isValid ;
      
	}

	resetForm = () => {
		this.setState({
			customerName:'',
			phone: '',
			email: '',
			customerNameError: '',
			phoneError : '',
			emailError: '',
			emailErrorMsg:'',
			isFormValid : false,
		 })
	}
	
	
	validateEmail = (text) =>  {
		let reg = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/;
		return reg.test(text)
	};


	handleSubmit = () => {
		let ValidateData = {
			customerName: this.state.customerName,
			email: this.state.email,
			phone: this.state.phone ,
			isFormValid : this.state.isFormValid  
		}
		let isValid =  this.isFormValid(ValidateData) 


	   if (isValid) {

			let inviteData = {
				customerName: this.state.customerName,
				email: this.state.email,
				phone: (this.state.phone !== '') ? '+91'+this.state.phone : '' ,
			}

			this.props.handlerLoader();
			const url = getUrl("inviteCustomer");
			post(url, inviteData, localStorage.getItem('userToken'))
			.then((res) => {
				console.log(res)
				const { data: { code, status, message, messages } } = res;
				switch (code) {
					case 200:
						if (status) {
							toastr.success(message)
							this.getPendingCustomersListing()
							this.resetForm();
							this.props.handlerLoader();
						}
						break;
					case 400:
						toastr.error(message)
						this.props.handlerLoader();
						break;
					case 422:
						toastr.info(message)
						this.props.handlerLoader();
						break;
					default:
						toastr.error(message||messages)
						this.props.handlerLoader();
						break;
				}
			})
			.catch((err) => {
				console.log(err)
			})
	   }
		
	}


	render () {
		return (
			<Flex className='invitecustomer-component'>
				<Flex className='customer'>
					<FormLabel htmlFor='Customer name' style={AccountantStyles.formLabel}>
						Customer name
					</FormLabel>
					<Input placeholder='Customer name' style={AccountantStyles.nestedinput} 
					name="customerName" 
					focusBorderColor="lime"
					isInvalid={this.state.customerNameError}
					errorBorderColor="crimson"
					onChange={this.onInputChangeHandler}
					/>
				</Flex>
				<Flex className='invitesms'>
					<FormLabel htmlFor='number' style={AccountantStyles.formLabel}>
						Invite via SMS
					</FormLabel>
					<InputGroup>
						<InputLeftAddon children='+61' pt='25px' pb='25px' />
						<Input
							type='tel'
							roundedLeft='0'
							placeholder='phone number'
							type='number'
							style={AccountantStyles.nestedinput}
							name="phone" 
							focusBorderColor="lime"
							isInvalid={this.state.phoneError}
							errorBorderColor="crimson"
							onChange={this.onInputChangeHandler}
						/>
					</InputGroup>
					{this.state.emailErrorMsg}
				</Flex>
				<Flex className='invitemail'>
					<FormLabel htmlFor='Email address' style={AccountantStyles.formLabel}>
						Invite via Email
					</FormLabel>
					<Input placeholder='Email address' style={AccountantStyles.nestedinput}  
					name="email" 
					focusBorderColor="lime"
					isInvalid={this.state.emailError}
					errorBorderColor="crimson"
					onChange={this.onInputChangeHandler}
					/>
					
				</Flex>


				<Flex className='sendinvite'>
					<PrimaryButton onClick={this.handleSubmit}>Send Invite</PrimaryButton>
				</Flex>


				{this.props.loader && <div className="loader">
                    <Spinner />
                </div>}

				
			</Flex>
		);
	}
}
 
export default InviteCustomer;
