import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import {
  actions as paymentCardsActions,
  selectors as paymentCardsSelectors,
} from 'ducks/paymentCards'
import PaymentCardsView from './PaymentCards.view'

const mapStateToProps = state => ({
  paymentCards: paymentCardsSelectors.cardsList(state),
  error: state.paymentCards.error,
})

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    getPaymentCards: paymentCardsActions.getPaymentCards,
  }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(PaymentCardsView)
