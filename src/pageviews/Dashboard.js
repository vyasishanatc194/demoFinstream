// Core imports
import React, { Component } from 'react';
import { CSSReset } from '@chakra-ui/core';
import  { ThemeProvider } from 'styled-components';
import { Theme } from '../Theme';

//Import Component
import Header from '../components/subcomponent/Header'

// App
export default class ResetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn:false,
            apiMessage: '',
            message: ''
        };
    }



    componentDidMount() {
        
        if (localStorage.getItem('userToken') !== '' && localStorage.getItem('userToken') !== null) {
            this.setState({ isLoggedIn: true });
        } else {
            this.setState({ apiMessage: 'error', message: 'You can not view this page, First register your self then you will redirect here' })
            setTimeout(function () {
                this.props.history.push(`/accountantsignup`)
            }.bind(this), 2000);
        }
    }
    render() {
        return (
            <ThemeProvider theme={Theme}>
                <CSSReset />
                <Header  isLoggedIn={this.state.isLoggedIn}/>
                <h1>Dashboard</h1>
            </ThemeProvider>
        );
    }
}
