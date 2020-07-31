import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import DashboardComponent from '../components/Dashboard/DashboardComponent';
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
    )(DashboardComponent)
);