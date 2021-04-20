module.exports = {
  apiUrl: null,
  theme: process.env.THEME,
  membershipPlanId: (() => {
    // note: if overwritten then all cases must be kept
    switch (process.env.THEME) {
      case 'bink': return null
      case 'wasabi': return 315
    }
  })(),
  isMerchantChannel: (() => {
    // note: if overwritten then all cases must be kept
    switch (process.env.THEME) {
      case 'bink': return false
      case 'wasabi': return true
    }
  })(),
  magicLinkSlug: (() => {
    switch (process.env.THEME) {
      case 'bink': return null
      case 'wasabi': return 'wasabi-club'
    }
  })(),
  clientId: null,
  bundleId: (() => {
    switch (process.env.THEME) {
      case 'bink': return 'com.bink.wallet'
      case 'wasabi': return 'com.wasabi.bink.web'
    }
  })(),
  accountTitle: (() => {
    switch (process.env.THEME) {
      case 'bink': return 'My account' 
      case 'wasabi': return 'Wasabi Club support'
    }
  })(),
  urls: (() => {
    switch (process.env.THEME) {
      case 'bink': return {
        support: 'https://bink.com', // todo: Add bink support url when known
      }
      case 'wasabi': return { //todo: consider addition to plan documents on api?
        support: 'https://www.wasabi.uk.com/contact-us/',
        merchantFaq: 'https://www.wasabi.uk.com/faq/',
        binkFaq: 'https://help.bink.com/hc/en-gb/categories/360002202520-Frequently-Asked-Questions',
        termsAndConditions: 'https://www.wasabi.uk.com/terms-and-conditions/',
      }
    }
  })(),
  planTitle: (() => {
    switch (process.env.THEME) {
      case 'bink': return 'Access your loyalty account'
      case 'wasabi': return 'Wasabi Club'
    }
  })(),
  magicLinkRequestFormDescription: (() => {
    switch (process.env.THEME) {
      case 'bink': return ['Get a link sent to your inbox so you can register or login instantly!']
      case 'wasabi':
        const planTitle = 'Wasabi Club'
        const planType = 'card'
        return [
          'Collect 7 stamps for a £7 OFF Meal Voucher. One stamp can be earned per customer per transaction when the qualifying spend in a single transaction for food & drink purchases totals £7.00 or more in a participating Wasabi store. Ts and Cs apply.',
          `Bink is a service which links payment cards to loyalty memberships allowing you to earn rewards automatically when you shop. By entering your email address below Bink will check if you already have a ${planTitle} ${planType}.`,
          'Log in or become a new member just by entering your email address.',
        ]
    }
  })(),
  // dev only (and likely temporary)
  devDefaultUser: (() => {
    switch (process.env.THEME) {
      case 'bink': return 'bink_web_user_2@bink.com'
      case 'wasabi': return 'bink_web_wasabi_1@bink.com'
    }
  })(),
  supportDebugLogin: true,
}
