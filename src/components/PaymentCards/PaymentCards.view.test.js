import React from 'react'
import { render } from '@testing-library/react'

import PaymentCardsView from './PaymentCards.view'

describe('PaymentCardsView', () => {
  it('calls the getPaymentCards prop', () => {
    const paymentCards = null
    const getPaymentCards = jest.fn()

    render(
      <PaymentCardsView
        paymentCards={paymentCards}
        getPaymentCards={getPaymentCards}
      />,
    )

    expect(getPaymentCards).toHaveBeenCalled()
  })

  it('doesn\'t render any payment cards when paymentCards prop is null', () => {
    const paymentCards = null
    const getPaymentCards = jest.fn()

    const { queryByTestId } = render(
      <PaymentCardsView
        paymentCards={paymentCards}
        getPaymentCards={getPaymentCards}
      />,
    )

    expect(queryByTestId('payment-card')).toBeNull()
  })

  it('renders the correct amount of payment cards', () => {
    const paymentCards = [{"id":35408,"membership_cards":[{"id":33420,"active_link":true}],"status":"active","card":{"first_six_digits":"545454","last_four_digits":"5454","month":2,"year":2022,"country":"UK","currency_code":"GBP","name_on_card":"TEST JACK","provider":"Mastercard","type":"debit"},"images":[{"id":6,"url":"https://api.dev.gb.bink.com/content/dev-media/hermes/schemes/Mastercard-Payment_1goHQYv.png","type":0,"encoding":"png","description":"Mastercard Card Image"}],"account":{"verification_in_progress":false,"status":1,"consents":[{"type":0,"latitude":51.405372,"longitude":-0.678357,"timestamp":1606836025}]}},{"id":35305,"membership_cards":[],"status":"pending","card":{"first_six_digits":"675900","last_four_digits":"0005","month":2,"year":2022,"country":"UK","currency_code":"GBP","name_on_card":"JJ","provider":"Visa","type":"debit"},"images":[],"account":{"verification_in_progress":false,"status":1,"consents":[{"type":0,"latitude":51.405372,"longitude":-0.678357,"timestamp":1606321816}]}},{"id":35304,"membership_cards":[],"status":"pending","card":{"first_six_digits":"679999","last_four_digits":"0019","month":1,"year":2022,"country":"UK","currency_code":"GBP","name_on_card":"JJ","provider":"Visa","type":"debit"},"images":[],"account":{"verification_in_progress":false,"status":1,"consents":[{"type":0,"latitude":51.405372,"longitude":-0.678357,"timestamp":1606321178}]}},{"id":35303,"membership_cards":[{"id":33420,"active_link":true}],"status":"active","card":{"first_six_digits":"555555","last_four_digits":"4444","month":1,"year":2022,"country":"UK","currency_code":"GBP","name_on_card":"J J","provider":"Mastercard","type":"debit"},"images":[{"id":6,"url":"https://api.dev.gb.bink.com/content/dev-media/hermes/schemes/Mastercard-Payment_1goHQYv.png","type":0,"encoding":"png","description":"Mastercard Card Image"}],"account":{"verification_in_progress":false,"status":1,"consents":[{"type":0,"latitude":51.405372,"longitude":-0.678357,"timestamp":1606308591}]}},{"id":35299,"membership_cards":[{"id":33420,"active_link":true}],"status":"active","card":{"first_six_digits":"510510","last_four_digits":"5100","month":2,"year":2021,"country":"GB","currency_code":"GBP","name_on_card":"J","provider":"Mastercard","type":"debit"},"images":[{"id":6,"url":"https://api.dev.gb.bink.com/content/dev-media/hermes/schemes/Mastercard-Payment_1goHQYv.png","type":0,"encoding":"png","description":"Mastercard Card Image"}],"account":{"verification_in_progress":false,"status":1,"consents":[{"type":0,"latitude":51.405372,"longitude":-0.678357,"timestamp":1517549941}]}},{"id":35209,"membership_cards":[],"status":"active","card":{"first_six_digits":"442544","last_four_digits":"8308","month":11,"year":2022,"country":"UK","currency_code":"GBP","name_on_card":"Bink Web User","provider":"Visa","type":"debit"},"images":[{"id":7,"url":"https://api.dev.gb.bink.com/content/dev-media/hermes/schemes/Visa-Payment_DWQzhta.png","type":0,"encoding":"png","description":"Visa Card Image"}],"account":{"verification_in_progress":false,"status":1,"consents":[{"type":1,"latitude":0,"longitude":0,"timestamp":1605474168}]}}]
    const getPaymentCards = jest.fn()

    const { getAllByTestId } = render(
      <PaymentCardsView
        paymentCards={paymentCards}
        getPaymentCards={getPaymentCards}
      />,
    )

    expect(getAllByTestId('payment-card')).toHaveLength(6)
  })
})
