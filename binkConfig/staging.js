module.exports = {
  apiUrl: 'https://api.staging.gb.bink.com',
  env: 'staging',
  membershipPlanId: (() => {
    // note: if overwritten then all cases must be kept
    switch (process.env.THEME) {
      case 'bink': return null
      case 'wasabi': return 281
    }
  })(),
  clientId: (() => {
    switch (process.env.THEME) {
      case 'bink': return 'MKd3FfDGBi1CIUQwtahmPap64lneCa2R6GvVWKg6dNg4w9Jnpd'
      case 'wasabi': return 'Lut7mjRCl0WqrCvsDbRB6zt7IyDzVltSU9tKg1Igxh29xBS0MX'
    }
  })(),
}
