module.exports = {
  apiUrl: 'https://api.dev.gb.bink.com',
  env: 'development',
  clientId: (() => {
    switch (process.env.THEME) {
      case 'bink': return 'MKd3FfDGBi1CIUQwtahmPap64lneCa2R6GvVWKg6dNg4w9Jnpd'
      case 'wasabi': return 'KY6ia4AvWwl9GXnKfPMqHJy7U3vUE2pSpDjJaqazZ0LZCHu5dj'
    }
  })(),
}
