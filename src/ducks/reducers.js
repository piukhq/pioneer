import { combineReducers } from 'redux'
import user from './user'
import paymentCards from './paymentCards'
import membershipCards from './membershipCards'

export default combineReducers({
  user,
  paymentCards,
  membershipCards,
})
