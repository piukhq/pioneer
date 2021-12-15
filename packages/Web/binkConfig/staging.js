module.exports = {
  apiUrl: 'https://api.staging.gb.bink.com',
  env: 'staging',
  membershipPlanId: (() => {
    // note: if overwritten then all cases must be kept
    switch (process.env.THEME) {
      case 'bink': return null
      case 'wasabi': return 281
      case 'fatface': return 246
    }
  })(),
  clientId: (() => {
    switch (process.env.THEME) {
      case 'bink': return 'MKd3FfDGBi1CIUQwtahmPap64lneCa2R6GvVWKg6dNg4w9Jnpd'
      case 'wasabi': return 'Lut7mjRCl0WqrCvsDbRB6zt7IyDzVltSU9tKg1Igxh29xBS0MX'
      case 'fatface': return 'zARoBYFRmsocQOEYyp8Cl3su5YstcGzsMFANgytYFObLYlrJ6l'
    }
  })(),
  bundleId: (() => {
    switch (process.env.THEME) {
      case 'bink': return 'com.bink.wallet'
      case 'wasabi': return 'com.wasabi.bink.web'
      case 'fatface': return 'com.fatface.bink.web'
    }
  })(),
  idleTimeoutMinutes: 15,
}
