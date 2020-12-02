import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { actions as paymentCardsActions } from 'ducks/paymentCards'
import PaymentCardsView from './PaymentCards.view'

const mapStateToProps = state => ({
  paymentCards: state.paymentCards.cards,
})

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    getPaymentCards: paymentCardsActions.getPaymentCards,
  }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(PaymentCardsView)
