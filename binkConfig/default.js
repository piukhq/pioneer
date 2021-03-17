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
  clientId: (() => {
    switch (process.env.THEME) {
      case 'bink': return 'MKd3FfDGBi1CIUQwtahmPap64lneCa2R6GvVWKg6dNg4w9Jnpd'
      case 'wasabi': return 'KY6ia4AvWwl9GXnKfPMqHJy7U3vUE2pSpDjJaqazZ0LZCHu5dj'
    }
  })(),
  bundleId: (() => {
    switch (process.env.THEME) {
      case 'bink': return 'com.bink.wallet'
      case 'wasabi': return 'com.wasabi.bink.web'
    }
  })(),
  accountTitle: (() => {
    switch (process.env.THEME) {
      case 'bink': return 'Logout' // todo: change to 'My account' when content modal available
      case 'wasabi': return 'Logout' // todo: change to 'Wasabi Club support' when content modal available
    }
  })(),
  // dev only (and likely temporary)
  devDefaultUser: (() => {
    switch (process.env.THEME) {
      case 'bink': return 'bink_web_user_2@bink.com'
      case 'wasabi': return 'bink_web_wasabi_1@bink.com'
    }
  })(),
}
