import { combineReducers } from 'redux'
import authentication from './authentication'
import paymentCards from './paymentCards'

export default combineReducers({
  authentication,
  paymentCards,
})
