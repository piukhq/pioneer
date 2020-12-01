import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { actions as authenticationActions } from 'ducks/authentication';
import HomePage from './HomePage';

const mapStateToProps = state => ({
  api_key: state.authentication.api_key,
});

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    login: authenticationActions.login,
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
