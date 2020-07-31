import React, { Component } from 'react';


// CSS imports
import '../../styles.css';

// Chakra-UI import components
import { Flex, Link, Box, } from '@chakra-ui/core';

//Import Api Url and Data
import { getUrl } from '../../services/network/urls';
import { get } from '../../services/network/requests';

export class PendingCustomers extends Component {

	constructor(props) {
        super(props);
        this.state = {
			customers: this.props.pendingCustomersData ,
			customers_count : 0,

        };
	}

	

	componentDidUpdate(prevProps) {
		if (prevProps.pendingCustomersData !== this.props.pendingCustomersData) {
			this.setState({ 
				customers: this.props.pendingCustomersData ,
				
			});
		}
	}

	

	


	render () {

		return (
			<div>
				{this.state.customers.map((cust, index) => {
					return(
						<Flex className='pending-row' key={index}>
							<Flex className='name'>{cust.user_name}</Flex>
							<Flex className='mobilenumber'>{cust.user_phone || '-'}</Flex>
							<Flex className='email'>
								<Link>{cust.user_email || '-'}</Link>
							</Flex>
							<Flex className='status'>
								<Box className='pending'>Pending...</Box>
							</Flex>
						</Flex>
					);
				})}
			</div>
		);
	}
}

export default PendingCustomers;
