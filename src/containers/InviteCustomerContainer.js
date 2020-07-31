import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import InviteCustomer from '../components/accountant/InviteCustomer';
import { updateLoaderStatus , getPendingCustomersData} from '../actions/mainAction'
const mapStateToProps = (state) => ({
    loader: state.user.loader,
    pendingCustomersData: state.user.pendingCustomersData, 
   
});

const mapDispatchToProps = (dispatch) => ({
    handlerLoader: () => dispatch(updateLoaderStatus()),
    getPendingCustomersData: (value) => dispatch(getPendingCustomersData(value)),
   
});


export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(InviteCustomer)
);