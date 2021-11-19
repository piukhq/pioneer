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
      case 'bink': return null
      case 'wasabi': return '0Jv6NOJEqcYV961QQ3fuEWhTykDlfoZlHQfu0VfFhiqKv4BYND'
      case 'fatface': return null
    }
  })(),
  devOnlyToolsEnabled: false,
  spreedlyEnvironmentKey: '1Lf7DiKgkcx5Anw7QxWdDxaKtTa',
  disabledPersistentSessions: true, // TODO: Temporary measure for web-464
  idleTimeoutMinutes: 60,
}
