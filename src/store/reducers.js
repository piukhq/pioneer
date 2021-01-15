import { combineReducers } from 'redux'
import users from 'ducks/users'
import paymentCards from 'ducks/paymentCards'
import membershipCards from 'ducks/membershipCards'
import membershipPlans from 'ducks/membershipPlans'

export default combineReducers({
  users,
  paymentCards,
  membershipCards,
  membershipPlans,
})
