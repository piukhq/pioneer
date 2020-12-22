import { combineReducers } from 'redux'
import user from 'ducks/user'
import paymentCards from 'ducks/paymentCards'
import membershipCards from 'ducks/membershipCards'

export default combineReducers({
  user,
  paymentCards,
  membershipCards,
})
