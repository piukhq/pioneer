import axios from 'axios'
import Config from 'Config'

export const getMembershipCards = () => (
  axios.get(
    `${Config.apiUrl}/ubiquity/membership_cards`,
    {
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`,
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
        Authorization: `Token ${localStorage.getItem('token')}`,
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
        Authorization: `Token ${localStorage.getItem('token')}`,
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
        Authorization: `Token ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json;v=1.3',
      },
    },
  )
)

// todo: temporarily introduced
export const unLinkPaymentCard = (paymentCardId, membershipCardId) => (
  axios.delete(
    `${Config.apiUrl}/ubiquity/membership_card/${membershipCardId}/payment_card/${paymentCardId}`,
    {
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json;v=1.3',
      },
    },
  )
)
