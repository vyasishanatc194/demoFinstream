import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import UserTeamMates from '../components/accountant/UserTeamMates';
import { updateLoaderStatus, getTeammatesData , updateUserData } from '../actions/mainAction'
const mapStateToProps = (state) => ({
    loader: state.user.loader,
    teammatesData: state.user.teammatesData,
    userDetails: state.user.userDetails,
});

const mapDispatchToProps = (dispatch) => ({
    handlerLoader: () => dispatch(updateLoaderStatus()),
    getTeammatesData: () => dispatch(getTeammatesData()),
    updateUserData:() => dispatch(updateUserData()),
});


export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(UserTeamMates)
);