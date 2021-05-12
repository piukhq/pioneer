module.exports = {
  apiUrl: null,
  theme: process.env.THEME,
  // todo: should be moved into development.js
  membershipPlanId: (() => {
    // note: if overwritten then all cases must be kept
    switch (process.env.THEME) {
      case 'bink': return null
      case 'wasabi': return 315
      case 'fatface': return 281
    }
  })(),
  isMerchantChannel: (() => {
    // note: if overwritten then all cases must be kept
    switch (process.env.THEME) {
      case 'bink': return false
      case 'wasabi': return true
      case 'fatface': return true
    }
  })(),
  magicLinkSlug: (() => {
    switch (process.env.THEME) {
      case 'bink': return null
      case 'wasabi': return 'wasabi-club'
      case 'fatface': return 'fatface'
    }
  })(),
  clientId: null,
  bundleId: (() => {
    switch (process.env.THEME) {
      case 'bink': return 'com.bink.wallet'
      case 'wasabi': return 'com.wasabi.bink.web'
      case 'fatface': return 'com.fatface.bink.web'
    }
  })(),
  accountTitle: (() => {
    switch (process.env.THEME) {
      case 'bink': return 'My account'
      case 'wasabi': return 'Wasabi Club support'
      case 'fatface': return 'FatFace Club support' // todo: to revise copy
    }
  })(),
  urls: (() => {
    switch (process.env.THEME) {
      case 'bink': return {
        support: 'https://bink.com', // todo: Add bink support url when known
      }
      case 'wasabi': return { // todo: consider addition to plan documents on api?
        support: 'https://www.wasabi.uk.com/contact-us/',
        merchantFaq: 'https://www.wasabi.uk.com/faq/',
        binkFaq: 'https://help.bink.com/hc/en-gb/categories/360002202520-Frequently-Asked-Questions',
        termsAndConditions: 'https://www.wasabi.uk.com/terms-and-conditions/',
      }
      case 'fatface': return { // todo: consider addition to plan documents on api?
        // todo: these still link to wasabi for now
        support: 'https://www.wasabi.uk.com/contactf-us/',
        merchantFaq: 'https://www.wasabi.uk.com/faq/',
        binkFaq: 'https://help.bink.com/hc/en-gb/categories/360002202520-Frequently-Asked-Questions',
        termsAndConditions: 'https://www.wasabi.uk.com/terms-and-conditions/',
      }
    }
  })(),
  planTitle: (() => { // used by the login page
    switch (process.env.THEME) {
      case 'bink': return 'Access your loyalty account'
      case 'wasabi': return 'Wasabi Club'
      case 'fatface': return 'FatFace account' // todo: copy
    }
  })(),
  magicLinkRequestFormDescription: (() => {
    switch (process.env.THEME) {
      case 'bink': return ['Get a link sent to your inbox so you can register or login instantly!']
      case 'wasabi': {
        const planTitle = 'Wasabi Club'
        const planType = 'card'
        return [
          'Collect 7 stamps for a £7 OFF Meal Voucher. One stamp can be earned per customer per transaction when the qualifying spend in a single transaction for food & drink purchases totals £7.00 or more in a participating Wasabi store. Ts and Cs apply.',
          `Bink is a service which links payment cards to loyalty memberships allowing you to earn rewards automatically when you shop. By entering your email address below Bink will check if you already have a ${planTitle} ${planType}.`,
          'Log in or become a new member just by entering your email address.',
        ]
      }
      case 'fatface': { // todo: temporarily copy of Wasabi copy
        const planTitle = 'Wasabi Club'
        const planType = 'card'
        return [
          'Collect 7 stamps for a £7 OFF Meal Voucher. One stamp can be earned per customer per transaction when the qualifying spend in a single transaction for food & drink purchases totals £7.00 or more in a participating Wasabi store. Ts and Cs apply.',
          `Bink is a service which links payment cards to loyalty memberships allowing you to earn rewards automatically when you shop. By entering your email address below Bink will check if you already have a ${planTitle} ${planType}.`,
          'Log in or become a new member just by entering your email address.',
        ]
      }
    }
  })(),
  // dev only (and likely temporary)
  devDefaultUser: (() => {
    switch (process.env.THEME) {
      case 'bink': return 'bink_web_user_2@bink.com'
      case 'wasabi': return 'bink_web_wasabi_1@bink.com'
      case 'fatface': return 'bink_web_fatface_1@bink.com'
    }
  })(),
  supportDebugLogin: true,
  spreedlyCardNumberStyle: (() => {
    switch (process.env.THEME) {
      case 'bink':
        return {
          // note: use encodeURIComponent since the config library doesn't like the character % in its strings
          default: encodeURIComponent('width: 100%; font-size: 16px; line-height: 22px; box-sizing: border-box; color: #054127; margin: 0'),
          error: encodeURIComponent('width: 100%; font-size: 16px; line-height: 22px; box-sizing: border-box; color: #a30f27 margin: 0'),
        }
      case 'wasabi':
        return {
          // Line-height should be 62px - 2px. The 2px are substracted due to the border around the input box
          // Margin: 0, is added due to the fact than in safari there is some padding on the input field and the text
          // will not be properly centered vertically.
          default: encodeURIComponent('width: 100%; font-size: 18px; line-height: 60px; box-sizing: border-box; color: #054127; margin: 0'),
          error: encodeURIComponent('width: 100%; font-size: 18px; line-height: 60px; box-sizing: border-box; color: #a30f27; margin: 0'),
        }
      case 'fatface': // todo
        return {
          // Line-height should be 62px - 2px. The 2px are substracted due to the border around the input box
          // Margin: 0, is added due to the fact than in safari there is some padding on the input field and the text
          // will not be properly centered vertically.
          default: encodeURIComponent('width: 100%; font-size: 14px; line-height: 38px; box-sizing: border-box; color: #57595b; margin: 0'),
          error: encodeURIComponent('width: 100%; font-size: 14px; line-height: 38px; box-sizing: border-box; color: #57595b; margin: 0'),
        }
    }
  })(),
}
