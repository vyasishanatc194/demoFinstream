import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import AccountantAuthenticationCodeComponent from '../components/accountant/AccountantAuthenticationCodeComponent';
import { updateUserData, updateLoaderStatus } from '../actions/mainAction'

const mapStateToProps = (state) => ({
    loader: state.user.loader
});

const mapDispatchToProps = (dispatch) => ({

    updateUserData: (data) => dispatch(updateUserData(data)),
    handlerLoader: () => dispatch(updateLoaderStatus()),

});


export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(AccountantAuthenticationCodeComponent)
);