// Core imports
import React, { Component, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// CSS imports
import './styles.css';

import {Spinner} from '@chakra-ui/core';
// Imported router views
const AccountantLogin = lazy(() => import('./pageviews/AccountantLogin'));
const AccountantAuthenticationCode = lazy(() => import('./pageviews/AccountantAuthenticationCode'));
const ResetPassword = lazy(() => import('./pageviews/ResetPassword'));
const AccountantSignup = lazy(() => import('./pageviews/AccountantSignup'));
const AccountantVerifyEmail = lazy(() => import('./pageviews/AccountantVerifyEmail'));
const AccountantDashboard = lazy(() => import('./pageviews/AccountantDashboard'));
const Dashboard = lazy(() => import('./pageviews/Dashboard'));
const PolicyComponent = lazy(() => import('./pageviews/PolicyComponent'));
// App
export default class App extends Component {
	componentDidMount(){
		if (localStorage.getItem('lastclear')  !== null){
			var lastclear = localStorage.getItem('lastclear'),
				time_now = (new Date()).getTime();
			if ((time_now - lastclear) > 1000 * 60 * 60 * 3) {
				localStorage.clear();
				localStorage.setItem('userToken','');
				localStorage.setItem('lastclear', '');
			}
		}
	}
	render () {
		return (
			<Router>
				<Suspense fallback={<div className="loader">
					<Spinner />
				</div>}>
					{/* Authentication Routes */}
					<Route exact path='/' component={AccountantLogin} />
					<Route exact path='/accountantlogin' component={AccountantLogin} />
					<Route exact path='/two-factor-auth' component={AccountantAuthenticationCode} />
					{/* Reset Password Routes */}
					<Route exact path='/resetpassword' component={ResetPassword} />
					{/* Registration Routes */}
					<Route exact path='/accountantsignup' component={AccountantSignup} />
					<Route exact path='/accountantverifyemail' component={AccountantVerifyEmail} />
					{/* Generic Routes  */}
					<Route exact path='/dashboard' component={Dashboard} />
					<Route exact path='/accountantdashboard' component={AccountantDashboard} />
					<Route exact path='/privacy-policy' component={PolicyComponent} />
				</Suspense>
			</Router>
		);
	}
}
