import axios from 'axios'
import { getAuthTokenString } from '../utils/storage' // TODO: Temporary measure for Web-464

export const getMembershipCards = () => (
  axios.get(
    `${Config.apiUrl}/ubiquity/membership_cards`,
    {
      headers: {
        Authorization: getAuthTokenString(),
        'Content-Type': 'application/json;v=1.3',
      },
    },
  )
)

export const deleteMembershipCard = (id) => (
  axios.delete(
    `${Config.apiUrl}/ubiquity/membership_card/${id}`,
    {
      headers: {
        Authorization: getAuthTokenString(),
        'Content-Type': 'application/json;v=1.3',
      },
    },
  )
)

export const addMembershipCard = (accountData, planId) => (
  axios.post(
    `${Config.apiUrl}/ubiquity/membership_cards`,
    {
      account: accountData,
      membership_plan: planId,
    },
    {
      headers: {
        Authorization: getAuthTokenString(),
        'Content-Type': 'application/json;v=1.3',
      },
    },
  )
)

export const linkPaymentCard = (paymentCardId, membershipCardId) => (
  axios.patch(
    `${Config.apiUrl}/ubiquity/membership_card/${membershipCardId}/payment_card/${paymentCardId}`,
    null,
    {
      headers: {
        Authorization: getAuthTokenString(),
        'Content-Type': 'application/json;v=1.3',
      },
    },
  )
)

// todo: should be removed before deployment to production
export const unLinkPaymentCard = (paymentCardId, membershipCardId) => (
  axios.delete(
    `${Config.apiUrl}/ubiquity/membership_card/${membershipCardId}/payment_card/${paymentCardId}`,
    {
      headers: {
        Authorization: getAuthTokenString(),
        'Content-Type': 'application/json;v=1.3',
      },
    },
  )
)
