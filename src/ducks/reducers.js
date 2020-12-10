import { combineReducers } from 'redux'
import user from './user'
import paymentCards from './paymentCards'

export default combineReducers({
  user,
  paymentCards,
})
