import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import LoginFormComponent from '../components/accountant/LoginFormComponent';
import { updateLoaderStatus } from '../actions/mainAction'
const mapStateToProps = (state) => ({
    loader: state.user.loader
});

const mapDispatchToProps = (dispatch) => ({
    handlerLoader: () => dispatch(updateLoaderStatus()),
});


export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(LoginFormComponent)
);