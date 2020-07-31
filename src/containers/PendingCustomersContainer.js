import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PendingCustomers from '../components/accountant/PendingCustomers';
import { updateLoaderStatus, getPendingCustomersData } from '../actions/mainAction'
const mapStateToProps = (state) => ( {

    
    loader: state.user.loader,
    pendingCustomersData: state.user.pendingCustomersData,   
});

const mapDispatchToProps = (dispatch) => ({
    handlerLoader: () => dispatch(updateLoaderStatus()),
    getPendingCustomersData: () => dispatch(getPendingCustomersData()),
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(PendingCustomers)
);