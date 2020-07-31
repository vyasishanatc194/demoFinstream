import React, { Component } from "react";
import {Redirect} from 'react-router'
import { CSSReset } from '@chakra-ui/core';
import styled,{ ThemeProvider } from 'styled-components';
import { Theme } from '../../Theme';

// Chakra-UI import components
import { Menu, MenuButton, MenuList, MenuItem, Button } from '@chakra-ui/core';
const NavBar = styled.div`
	display: flex;
	flex-direction: row;
	padding: 20px;
	background-color: ${(props) => props.theme.colours.finstreamBlue};
`;

class Header extends Component {
    state = {
        open: false,
        isloggedIn: localStorage.getItem('userToken') !== '' && localStorage.getItem('userToken') !== null && (localStorage.getItem('userTokenTemp') === 'false' || localStorage.getItem('userTokenTemp') === null ),
        logout : false
    }
    handleLogout = () => {
        localStorage.clear();
        this.setState({ logout : true})
        
    }
    render() {
        if(this.state.logout){
            return <Redirect to="/accountantlogin" push={true}/>
        }
        return (
                <React.Fragment>
                {
                    this.state.isloggedIn ? <ThemeProvider theme={Theme}>
                        <CSSReset />
                        <NavBar><Menu>
                            <MenuButton as={Button} rightIcon='chevron-down'>
                                Navigation
							</MenuButton>
                            <MenuList>
                                <MenuItem onClick={this.handleLogout}>
                                    Logout
								</MenuItem>
                            </MenuList>
                        </Menu></NavBar>
                    </ThemeProvider> : null
                }
                </React.Fragment>   
        );
    }
}
export default Header