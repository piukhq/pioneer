import { connect } from 'react-redux'

import LoginPageView from './LoginPage.view'

const mapStateToProps = state => ({
  api_key: state.user.authentication.api_key,
})

export default connect(mapStateToProps)(LoginPageView)
