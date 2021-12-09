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
      case 'bink': return 'bink-loyalty'
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
      case 'fatface': return 'FatFace Rewards support'
    }
  })(),
  urls: (() => {
    switch (process.env.THEME) {
      case 'bink': return {
        support: 'https://bink.com/frequently-asked-questions/#shoppers',
        iosStore: 'https://apps.apple.com/gb/app/bink-loyalty-rewards-wallet/id1142153931',
        androidStore: 'https://play.google.com/store/apps/details?id=com.bink.wallet&hl=en_GB&gl=US',
      }
      case 'wasabi': return { // todo: consider addition to plan documents on api?
        support: 'https://www.wasabi.uk.com/contact-us/',
        merchantFaq: 'https://www.wasabi.uk.com/faq/',
        binkFaq: 'https://help.bink.com/hc/en-gb/sections/4404115016850-Bink-Web',
        termsAndConditions: 'https://www.wasabi.uk.com/terms-and-conditions/',
      }
      case 'fatface': return { // todo: consider addition to plan documents on api?
        support: 'https://www.fatface.com/help-centre/contact-us.html',
        merchantFaq: 'https://www.fatface.com/help-centre/frequently-asked-questions.html',
        // todo: this is the same as for Wasabi for now. Might require updating when we know what it should be
        binkFaq: 'https://help.bink.com/hc/en-gb/sections/4404115016850-Bink-Web',
        termsAndConditions: 'https://www.fatface.com/legal-info/terms-and-conditions.html',
      }
    }
  })(),
  planTitlePrefix: (() => {
    switch (process.env.THEME) {
      case 'bink': return null
      case 'wasabi': return 'Welcome to'
      case 'fatface': return null
    }
  })(),
  planTitle: (() => { // used by the login page
    switch (process.env.THEME) {
      case 'bink': return 'Access your loyalty account'
      case 'wasabi': return 'Wasabi Club'
      case 'fatface': return 'FatFace Rewards'
    }
  })(),
  planTitleSuffix: (() => {
    switch (process.env.THEME) {
      case 'bink': return null
      case 'wasabi': return '!'
      case 'fatface': return null
    }
  })(),
  planSummary: (() => {
    switch (process.env.THEME) {
      case 'bink': return []
      case 'wasabi': {
        return [
          'Receive a £7 Off Meal Voucher when you collect 7 stamps!',
          'Fill in the form to become a member.',
        ]
      }
      case 'fatface': return []
    }
  })(),
  voucherPlanSummary: (() => {
    switch (process.env.THEME) {
      case 'bink': return null
      case 'wasabi': return 'Spend £7 or more to get a new stamp on each order. Once you collect 7 stamps, you will get a £7 off Meal Voucher!'
      case 'fatface': return null
    }
  })(),
  magicLinkRequestFormDescription: (() => {
    switch (process.env.THEME) {
      case 'bink': return ['Get a link sent to your inbox so you can register or login instantly!']
      case 'wasabi': {
        return [
          'Receive a £7 Off Meal Voucher when you collect 7 stamps!*',
          'If you would like to register/login to the Wasabi Club please enter your email address.',
          'Once you enter your email address Bink will check if you already have an account.**',
        ]
      }
      case 'fatface': {
        return [
          'Use your linked credit/debit cards every time you shop in a FatFace store or online at fatface.com to start earning Rewards. Each purchase gets you closer to a Reward Voucher. Once you have spent £100 you will receive a 15% Voucher to use online.',
          'Bink is technology that makes loyalty simpler. By connecting your loyalty account to the credit/debit card of your choice, you earn rewards every time you shop. By entering your email address you authorise Bink to check if you already have a loyalty account.',
          'Log in or become a new member just by entering your email address.',
        ]
      }
    }
  })(),
  magicLinkRequestFormFooterNote: (() => {
    switch (process.env.THEME) {
      case 'bink': return ''
      case 'wasabi': return '*One stamp can be earned per transaction when you spend £7 or more in a participating Wasabi store. '
      case 'fatface': return ''
    }
  })(),
  magicLinkRequestFormFooterLink: (() => {
    switch (process.env.THEME) {
      case 'bink': return null
      case 'wasabi': return 'Terms and Conditions apply'
      case 'fatface': return null
    }
  })(),
  // used for development
  devDefaultUser: (() => {
    switch (process.env.THEME) {
      case 'bink': return 'bink_web_user_1@bink.com'
      case 'wasabi': return 'bink_web_wasabi_1@bink.com'
      case 'fatface': return 'bink_web_fatface_1@bink.com'
    }
  })(),
  devOnlyToolsEnabled: true,
  spreedlyEnvironmentKey: 'Yc7xn3gDP73PPOQLEB2BYpv31EV',
  spreedlyCardNumberStyle: (() => {
    switch (process.env.THEME) {
      case 'bink':
        return {
          default: 'width: 100%; font-size: 16px; line-height: 22px; box-sizing: border-box; color: rgb(153, 153, 153); margin: 0',
          error: 'width: 100%; font-size: 16px; line-height: 22px; box-sizing: border-box; color: #ff0000; margin: 0',
        }
      case 'wasabi':
        return {
          // Line-height should be 62px - 2px. The 2px are substracted due to the border around the input box
          // Margin: 0, is added due to the fact than in safari there is some padding on the input field and the text
          // will not be properly centered vertically.
          default: 'width: 100%; font-size: 18px; line-height: 60px; box-sizing: border-box; color: #054127; margin: 0',
          error: 'width: 100%; font-size: 18px; line-height: 60px; box-sizing: border-box; color: #a30f27; margin: 0',
        }
      case 'fatface':
        return {
          // Line-height should be 40px - 2px. The 2px are substracted due to the border around the input box
          // Margin: 0, is added due to the fact than in safari there is some padding on the input field and the text
          // will not be properly centered vertically.
          default: 'width: 100%; font-size: 14px; line-height: 38px; box-sizing: border-box; color: #57595b; margin: 0',
          error: 'width: 100%; font-size: 14px; line-height: 38px; box-sizing: border-box; color: #57595b; margin: 0',
        }
    }
  })(),
}
