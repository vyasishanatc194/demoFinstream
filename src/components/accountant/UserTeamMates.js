import React, { Component } from 'react';
import styled from 'styled-components';
import { Theme, AccountantStyles } from '../../Theme';
import {Redirect} from 'react-router'
// CSS imports
import '../../styles.css';

// Image imports
import addTeammate from '../../assets/accountant_img/icon-add-teammate.svg';

// Chakra-UI import components
import {
	Image,
	Avatar,
	AvatarBadge,
	Popover,
	PopoverTrigger,
	PopoverContent,
	PopoverBody,
	PopoverArrow,
	Link,
	Input,
	Tooltip,
	Spinner
} from '@chakra-ui/core';

import toastr from 'toastr'
import 'toastr/build/toastr.min.css'

//Import Api Url and Data
import { getUrl } from '../../services/network/urls';
import { get, post } from '../../services/network/requests';

export class UserTeamMates extends Component {

	constructor(props) {
        super(props);
        this.state = {
			isloggedIn: localStorage.getItem('userToken') !== '' && localStorage.getItem('userToken') !== null && (localStorage.getItem('userTokenTemp') === 'false' || localStorage.getItem('userTokenTemp') === null ),
			logout : false,
			email: '',
			emailError: 'false',
			isOpen: false , 
			setIsOpen : false ,
			teammates : [] ,
			teammates_count : 0,
			user: [] 
        };

        toastr.options = {
			positionClass: 'toast-top-right',
			hideDuration: 300,
			timeOut: 2000
		}
	}
	
	handleLogout = () => {
        localStorage.clear();
        this.setState({ logout : true})
    }

	componentDidMount() {
		this.getTeammatesListing()
		this.getProfile()
	}


	componentDidUpdate(prevProps) {
		if (prevProps.teammatesData !== this.props.teammatesData) {
			this.setState({ 
				teammates: this.props.teammatesData.result.teammates ,
				teammates_count : this.props.teammatesData.result.teammates_count
			});
		}
		if (prevProps.userDetails !== this.props.userDetails) {
			this.setState({ 
				user: this.props.userDetails.result ,
			});
		}
	}

	getTeammatesListing = () => {

		const url = getUrl("getTeammates");
		get(url,localStorage.getItem('userToken'))
		.then((res) => {
			console.log(res)
			const { data: { code, status, message, messages, result } } = res;
			switch (code) {
				case 200:
					if (status) {
						this.setState({
							teammates : result.teammates ,
							teammates_count : result.teammates_count
						})
					}
					break;
				default:
					break;
			}
		})
		.catch((err) => {
			this.props.handlerLoader();
			console.log(err)
		})

	}

	getProfile = () => {

		const url = getUrl("profile");
		get(url,localStorage.getItem('userToken'))
		.then((res) => {
			console.log(res)
			const { data: { code, status, message, messages, result } } = res;
			switch (code) {
				case 200:
					if (status) {
						this.setState({
							user : result ,
						})
					}
					break;
				default:
					break;
			}
		})
		.catch((err) => {
			this.props.handlerLoader();
			console.log(err)
		})

	}

	onInputChangeHandler = (e) => {
		const { value, name } = e.target;
		this.setState({ [name]: value }, () => {
			switch (name) {
				case 'email':
					if (value === '') {
						this.setState({ [name + 'Error']: true })

					} else {
						this.setState({ [name + 'Error']: false })
					}
					break;
				default:
					break;
			}
		});
	}



	validateEmail = (text) =>  {
		let reg = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/;
		if (reg.test(text) === false) {
		  return false;
		} else {
		  return true;
		}
	};
	
	handleSubmit = () => {
		let ValidateData = {
			email: this.state.email,
		}
		let isValid = this.validateEmail(ValidateData.email)	
		if (isValid) {
			this.props.handlerLoader();
			const url = getUrl("addTeammate");
			post(url, ValidateData, localStorage.getItem('userToken'))
			.then((res) => {
				console.log(res)
				const { data: { code, status, message, messages, result } } = res;
				switch (code) {
					case 200:
						if (status) {
							toastr.success(message)
							this.getTeammatesListing()
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
				this.props.handlerLoader();
				console.log(err)
			})
			this.closePopover()
		}else{
			this.setState({ emailError : true })
		}
	}

	
	closePopover = () => {
		this.setState({ isOpen : false })
	}

	render () {

		console.log(this.props.loader)

		let show_teammates = this.state.teammates.slice(0,2) ;
		let remaining_teammates = this.state.teammates_count - 2 ;
		let reamining_teammates_name = [];
		this.state.teammates.slice(2,this.state.teammates_count).map((tm) => {
			reamining_teammates_name.push((tm.user_name || tm.user_email)) 
		})

		if(this.state.logout){
            return <Redirect to="/accountantlogin" push={true}/>
		}
		
		return (
			
			<div className='teammates'>
			
				<Popover  isOpen={this.state.isOpen} onClose={this.closePopover} >
					<PopoverTrigger  >
						<a className='adduser' onClick={() => this.setState({isOpen: !this.state.open})} >
							<Tooltip label='Add Team Mate' placement='bottom' id='tooltip'>
								<Image src={addTeammate} id='adduser' />
							</Tooltip>
						</a>
					</PopoverTrigger>
					<PopoverContent zIndex={4} id='popupmenu'>
						<PopoverArrow />
						<PopoverBody>
							<Input
								placeholder='Email address'
								bg='#F8F8F8'
								width='250px'
								mb='12px'
								pt='25px'
								pb='25px'
								color='#66708F'
								name="email" 
								focusBorderColor="lime"
								isInvalid={this.state.emailError}
								errorBorderColor="crimson"
								onChange={this.onInputChangeHandler}
							/>
							<Link style={Theme.link} onClick={this.handleSubmit} >Add Team Mate</Link>
							{this.props.loader && <div className="loader">
								<Spinner />
							</div>} 
						</PopoverBody>
					</PopoverContent>

				</Popover>


				{this.state.teammates_count > 0 ? 
				
				show_teammates.map( (tm, index) => {
					return (
					<Tooltip key={index} label={(tm.user_name || tm.user_email) + (tm.status == 0 ? " (Pending)" : '') } placement='bottom' id='tooltip'>
					 	<a className='teammate' >
					 		<Avatar name={ (tm.user_name || tm.user_email) + (tm.status == 0 ? " (Pending)" : '')} src={tm.user_profile_pic } size='sm' >
					 			{tm.status == 0 && <AvatarBadge bg='tomato' size='12px' border='none' mt='1px' />}
					 		</Avatar>
					 	</a>
					 </Tooltip>);
				})
				
				: null }

				{(remaining_teammates > 0) && 
					<Tooltip  label={reamining_teammates_name.join(', ')} placement='bottom' id='tooltip'>
					<a className='teammate' >
						<Avatar name={'+ '+remaining_teammates} size='sm' />
					</a>
				</Tooltip>}
				

				{/* 
				<Tooltip label='Ryan Florence' placement='bottom' id='tooltip'>
					<a className='teammate' >
						<Avatar name='Ryan Florence' src='https://bit.ly/ryan-florence' size='sm' />
					</a>
					</Tooltip>
				
				<Tooltip label='Kent Dodds' placement='bottom' id='tooltip'>
					<a className='teammate'>
						<Avatar name='Kent Dodds' src='https://bit.ly/kent-c-dodds' size='sm' />
					</a>
				</Tooltip>
				<Tooltip label='Dan Abrahmov (Pending)' placement='bottom' id='tooltip'>
					<a className='teammate'>
						<Avatar name='Dan Abrahmov' src='https://bit.ly/dan-abramov' size='sm'>
							<AvatarBadge bg='tomato' size='12px' border='none' mt='1px' />
						</Avatar>
					</a>
				</Tooltip>  */}

				<Popover>
					<PopoverTrigger>
						
						<a className='user'>
							<Avatar name={this.state.user.full_name} src='' />
						</a>
					</PopoverTrigger>
					<PopoverContent zIndex={4} id='popupmenu'>
						<PopoverArrow />
						<PopoverBody className='user-menu' pr='50px'>
							<Link style={Theme.link}>Profile</Link>
							<Link style={Theme.link}>Admin</Link>
							<Link style={Theme.link} onClick={this.handleLogout}>Signout</Link>
						</PopoverBody>
					</PopoverContent>
				</Popover>
			</div>
		);
	}
}

export default UserTeamMates;
