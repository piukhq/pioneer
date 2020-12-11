import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { actions as userActions } from 'ducks/user'
import LoginPageView from './LoginPage.view'

const mapStateToProps = state => ({
  api_key: state.user.authentication.api_key,
})

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    login: userActions.login,
  }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(LoginPageView)
