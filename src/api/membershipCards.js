import axios from 'axios'

export const getMembershipCards = () => (
  axios.get(
    'https://api.dev.gb.bink.com/ubiquity/membership_cards',
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
    `https://api.dev.gb.bink.com/ubiquity/membership_card/${id}`,
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
    'https://api.dev.gb.bink.com/ubiquity/membership_cards',
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
    `https://api.dev.gb.bink.com/ubiquity/membership_card/${membershipCardId}/payment_card/${paymentCardId}`,
    null,
    {
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json;v=1.3',
      },
    },
  )
)

// todo: to remove. This functionality was added because every now and then someone or something would remove the
// membership card for the test user account
export const addTestMembershipCard = () => (
  axios.post(
    'https://api.dev.gb.bink.com/ubiquity/membership_cards',
    {
      account: {
        add_fields: [
          {
            column: 'Membership card number',
            value: '1048175136',
          }],
        authorise_fields: [
          {
            column: 'Email',
            value: 'binktestuser18@wasabi.com',
          }],
      },
      membership_plan: '315',
    },
    {
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json;v=1.3',
      },
    },
  )
)
