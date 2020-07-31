const getBaseUrl = () => {
    // const dev = process.env.NODE_ENV === 'development';
  return 'http://13.55.251.104/api';
    // if (dev) {
    //   //here make base url 
    //   return 'http://13.55.251.104/api';
    // } else {
    //   return 'http://13.55.251.104/api';
    // }


};


export const getUrl = (type) => {
    const baseUrl = getBaseUrl();
    switch (type) {
      case 'signup':
        return `${baseUrl}/user/signup`;
      case 'verifyEmail':
        return `${baseUrl}/user/account-activate`;
      case 'signin':
        return `${baseUrl}/user/signin`;
      case 'authVerification':
        return `${baseUrl}/user/auth-verification`;
      case 'forgotPassword':
        return `${baseUrl}/user/forgot-password`;
      case 'addTeammate':
        return `${baseUrl}/add-teammate`;
      case 'getTeammates':
          return `${baseUrl}/get-teammates`;
      case 'getUserFromRegToken':
        return `${baseUrl}/user/reg-invite`;
      case 'profile':
          return `${baseUrl}/user/profile`;
      case 'inviteCustomer':
          return `${baseUrl}/invite-customer`;
      case 'pendingCustomers':
          return `${baseUrl}/pending-customers`;
      case 'activeCustomers':
          return `${baseUrl}/active-customers`;
      default:
        return baseUrl;
    }
  };
