module.exports = {
  apiUrl: 'https://api.dev.gb.bink.com',
  env: 'development',
  clientId: (() => {
    switch (process.env.THEME) {
      case 'bink': return 'MKd3FfDGBi1CIUQwtahmPap64lneCa2R6GvVWKg6dNg4w9Jnpd'
      case 'wasabi': return 'KY6ia4AvWwl9GXnKfPMqHJy7U3vUE2pSpDjJaqazZ0LZCHu5dj'
      case 'fatface': return 'xD1k2LTwUlSgwY4NF6TrqmQHoMzkZjlzJhb9d2bAFRcSykDvHm'
    }
  })(),
  bundleId: (() => {
    switch (process.env.THEME) {
      case 'bink': return 'com.bink.wallet'
      case 'wasabi': return 'com.wasabi.bink.web'
      case 'fatface': return 'com.fatface.bink.web'
    }
  })(),
  idleTimeoutMinutes: 5,
}
