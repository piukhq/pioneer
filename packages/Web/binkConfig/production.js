module.exports = {
  apiUrl: 'https://api.gb.bink.com',
  env: 'production',
  membershipPlanId: (() => {
    // note: if overwritten then all cases must be kept
    switch (process.env.THEME) {
      case 'bink': return null
      case 'wasabi': return 215
      case 'fatface': return 212
    }
  })(),
  clientId: (() => {
    switch (process.env.THEME) {
      case 'bink': return 'MKd3FfDGBi1CIUQwtahmPap64lneCa2R6GvVWKg6dNg4w9Jnpd'
      case 'wasabi': return '0Jv6NOJEqcYV961QQ3fuEWhTykDlfoZlHQfu0VfFhiqKv4BYND'
      case 'fatface': return null
    }
  })(),
  magicLinkSlug: (() => {
    switch (process.env.THEME) {
      case 'bink': return 'matalan-reward-card'
      case 'wasabi': return 'wasabi-club'
      case 'fatface': return 'fatface'
    }
  })(),
  devOnlyToolsEnabled: false,
  spreedlyEnvironmentKey: '1Lf7DiKgkcx5Anw7QxWdDxaKtTa',
  disabledPersistentSessions: true, // TODO: Temporary measure for web-464
  idleTimeoutMinutes: 15,
}
