/* eslint-disable react/jsx-no-target-blank */
// Core imports
import React, { Component } from 'react';
import { CSSReset } from '@chakra-ui/core';
import { ThemeProvider } from 'styled-components';
import { Theme } from '../Theme';
import logoFinstream from '../assets/global_img/logo-finstream.svg';
//Import Component
// import Header from '../components/subcomponent/Header'

// App
export default class PolicyComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false,
            apiMessage: '',
            message: ''
        };
    }
    componentDidMount() {

    }
    handleRedirect = () => {
        this.props.history.push(`/`)
    }
    render() {
        return (
            <ThemeProvider theme={Theme}>
                <CSSReset />
                {/* <Header isLoggedIn={this.state.isLoggedIn} /> */}
                <section class="section">
                    <div class="container">
                        <img src={logoFinstream} alt="Logo" class="logo" onClick={this.handleRedirect} />
                    </div>
                </section>

                <section class="section" id="privacypolicy">
                    <div class="container">
                        <h2>Finstream Privacy Policy</h2>
                        <h3>Version 1.0 Effective on and from 6th June 2020</h3>
                        <p>We recognise that Your privacy is very important to You. We are committed to protecting the privacy of Your Personal
          Information in accordance with the Privacy Act, 1988 (Cth) (Privacy Act).</p>
                        <p>This Policy describes how We collect, hold, use and disclose Personal Information collected in Australia,
          consistent with the Privacy Act.</p>
                        <p>The Policy is also notification to individuals of the matters required to be notified by the Australian Privacy Principles.</p>
                        <p>An individual who provides Personal Information to Us is given access to this Policy.</p>
                        <p>By providing Personal Information to Us, and by having access to this Policy, an individual consents to Us collecting,
          holding, using and disclosing Personal Information in accordance with this Policy.</p>
                        <h3>Definitions</h3>
                        <p>In this policy:</p><br />
                            <ul>
                                <li>Accountant means any person (and where a company, includes its officers, employees, agents and representatives)
            who We provide Services to as an Accountant.</li>
                                <li>Customer means any person (and where a company, includes its officers, employees, agents and representatives)
            who We provide Services to as a customer.</li>
                                <li>Our, Us and We refers to Finstream Technologies Pty Ltd ACN 614 414 244 and its Related Companies.</li>
                                <li>Personal Information means any information or an opinion that can identify an individual. It is still Personal
            Information whether or not it is true.</li>
                                <li>Related Company has the same meaning as Section 50 of the Corporations Act 2001 (Cth).</li>
                                <li>Services means services We provide to You.</li>
                                <li>You and Your refers to Accountants, Customers, and prospective Accountants and Customers. It also generally
            refers to users of our Websites.</li>
                                <li>Websites means all Websites used by Us through which the Services are provided.</li>
                            </ul>
                            <h3>Collection of Personal Information</h3>
                            <p>As outlined in this Policy, We collect Personal Information only if You are an Accountant or Customer. The types of
                            Personal Information that We may collect from You and how We use it will depend on the Services, how You use the Services
          and upon Your status as an Accountant, Customer or other user of our Services or Websites.</p>
                            <h3>What Personal Information is Collected</h3>
                            <ul>
                                <li>Personal Information collected by Us includes Your first, middle and last names; address; email address</li>
                                <li>If You do not provide this information We may not be able to provide the Services.</li>
                            </ul>
                            <h3>How we collect and hold Personal Information</h3>
                            <ul>
                                <li>Wherever possible We collect Personal Information directly from You. We may collect Your Personal Information via
            Our Websites, when You complete the online registration form</li>
                            </ul>
                            <h3>Use of cookies</h3>
                            <p>Cookies are unique identifiers that We transfer to Your device to enable Our systems to recognise Your computer and to
          review the manner in which You use the Services and to enhance the Services provided to You.</p>
                            <br />
                                <p>The Help feature on Your browser should let You know how to stop Your browser from accepting new cookies, how to have
                                the browser notify You when You receive a new cookie, or how to completely disable cookies. Additionally, You can disable
                                or delete similar data used by browser add-ons – such as Flash cookies – by changing the add-on’s settings or visiting
                                the Website of its manufacturer. Because cookies allow You to take advantage of some of Our Websites’ essential features,
                                We recommend that You leave them turned on. For instance, if You block or otherwise reject our cookies, You may not be
          able to use the Websites or the Services that requires You to sign-in.</p>
                                <h3>Why we collect and how we use Personal Information</h3>
                                <ul>
                                    <li>We collect and use Personal Information in order to process applications, calculate and process payments, improve the quality of the Services, confirm
            identification and to satisfy legal requirements.</li>
                                    <li>If We do not collect Your Personal Information, or if You provide Us with inaccurate or incomplete information,
                                    We may not be able to provide You with the Services, or fulfil the other purposes for which We collect Personal
            Information.</li>
                                    <li>Your Personal Information may also be used by Us for purposes including research and statistical analysis and marketing.</li>
                                    <li>From time to time We may use Your Personal Information to provide You with direct marketing information about the
            Services that We offer. If You do not wish to receive this information, You can unsubscribe by writing to Us at hello@finstream.app</li>
                                    <li>You will be reminded of Your option to opt out of receiving direct marketing materials each time You receive direct
            marketing communications from Us, or third parties engaged by Us.</li>
                                </ul>
                                <h3>Disclosure of your Personal Information</h3>
                                <p>WE NEVER SELL, RENT OR TRADE YOUR PERSONAL INFORMATION.</p>
                                <p>We may disclose Your Personal Information to Related Companies and third party service providers.</p>
                                <p>For example, We disclose Your Personal Information to third party service providers to perform activities in
          connection with the purposes described in this Policy. These disclosures include:</p>
                                <ul>
                                    <li>where a third party, such as a payment provider, external server providers, carry out activities on our behalf;</li>
                                    <li>if disclosure is otherwise required in order to provide You with a particular service;</li>
                                    <li>in order to ensure our ability to continue providing the Services;</li>
                                    <li>if disclosure is required for the purposes of conducting business analysis in order to improve our Services;</li>
                                    <li>if disclosure is required by law;</li>
                                    <li>where You have provided Your consent which may be given expressly or may reasonably be implied by Your conduct.</li>
                                </ul>
                                <p>We require related and unrelated third parties to whom Your Personal Information is disclosed to keep any Personal
          Information disclosed by Us, confidential and only use it for the same purposes We are permitted to use it.</p>
                                <p>We do not disclose Personal Information to any organisations located outside Australia. If in the future We intend to
                                disclose Personal Information to related or unrelated parties outside Australia, We will notify You in writing
                                (including by amending this policy) of the counties in which the recipients of Your Personal Information are located
                                and We will take reasonable steps to ensure that all overseas recipients of Personal Information comply with the
          Australian Privacy Principles.</p>
                                <h3>Access to your Personal Information</h3>
                                <ul>
                                    <li>You may access the information We hold about You. This right is subject to the exceptions detailed in the
            Australian Privacy Principles.</li>
                                    <li>You may also access a summary of Your Personal Information by contacting Us at:
            Attention Lee Vaughan, Chief Executive Officer, hello@finstream.app</li>
                                    <li>For complex or more detailed requests for access to Your Personal Information, for example, changing bank
            account details or access to information that is archived, We may require You to place Your request in writing.</li>
                                    <li>In all cases You will be asked to verify who You are before Your Personal Information is provided.</li>
                                    <li>All requests to access Personal Information will be handled in a reasonable time.</li>
                                    <li>If We deny You access We will let You know why in writing.</li>
                                </ul>
                                <h3>Correction of Your Personal Information</h3>
                                <ul>
                                    <li>During the course of Your relationship with Us We will ask You to inform Us of any changes to Your Personal Information.</li>
                                    <li>You may update Your Personal Information or advise Us that the information We have is not accurate, complete or
                                    up to date by writing to Us at Attention Lee Vaughan, Chief Executive Officer,
            hello@finstream.app</li>
                                    <li>You can also make changes by accessing the Admin Console as outlined above.</li>
                                    <li>There are circumstances in which We can refuse to correct Personal Information. If We do so, We will provide a
                                    written notice providing reasons for the refusal which You will have an opportunity to make a formal complaint about,
            if You feel it is necessary.</li>
                                    <li>All requests to correct Personal Information will be handled in a reasonable time.</li>
                                </ul>
                                <h3>Complaints</h3>
                                <ul>
                                    <li>You have a right to complain about how Your Personal Information has been handled. If You are concerned about a
            breach of Your privacy and wish to make a complaint, please provide a written complaint to Us at:</li>
                                    <li>Privacy Officer
                                    302/19 Haig st
                                    Brisbane, QLD 4151
                                    hello@finstream.app
            </li>
                                    <li>We will respond in writing within 30 days of receipt of a complaint.</li>
                                    <li>If the complaint remains unresolved, then You have the option of notifying the Office of the
                                    Australian Information Commissioner (OAIC). Contact details can be found at the OAIC’s Website:
                                    <a href="http://www.oaic.gov.au" target="_blank">www.oaic.gov.au</a></li>
                                </ul>
                                <h3>Currency and status of Our Privacy Policy</h3>
                                <ul>
                                    <li>This Policy may change from time to time and all changes will be posted on the Website.</li>
                                    <li>Whenever You use our Websites You should read our Privacy Policy in conjunction with the
            Acceptable Use Policy on the Website.</li>
                                </ul>
      </div>
     </section>
            </ThemeProvider>
        );
    }
}
