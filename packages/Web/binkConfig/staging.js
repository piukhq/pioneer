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
      case 'bink': return '2s8tNNejCsf8WbIG7aklwXsPU6TfbNaTg9XujR9by4vKjs9KXK'
      case 'wasabi': return 'Lut7mjRCl0WqrCvsDbRB6zt7IyDzVltSU9tKg1Igxh29xBS0MX'
      case 'fatface': return 'zARoBYFRmsocQOEYyp8Cl3su5YstcGzsMFANgytYFObLYlrJ6l'
    }
  })(),
  bundleId: (() => {
    switch (process.env.THEME) {
      case 'bink': return 'com.bink.bink20dev'
      case 'wasabi': return 'com.wasabi.bink.web'
      case 'fatface': return 'com.fatface.bink.web'
    }
  })(),
  idleTimeoutMinutes: 5,
}
