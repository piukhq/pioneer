import { connect } from 'react-redux'

import HomePageView from './HomePage.view'

const mapStateToProps = state => ({
  api_key: state.user.authentication.api_key,
})

export default connect(mapStateToProps)(HomePageView)
