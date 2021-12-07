module.exports = {
  apiUrl: 'https://api.sandbox.gb.bink.com',
  env: 'sandbox',
  clientId: (() => {
    switch (process.env.THEME) {
      case 'bink': return null
      case 'wasabi': return 'syhWBlWW8Bzn88ISbzKWzMqllHSGrt5oNPMAvAMfmiiCWk3JdD'
      case 'fatface': return null
    }
  })(),
  membershipPlanId: (() => {
    switch (process.env.THEME) {
      case 'bink': return null
      case 'wasabi': return 316
      case 'fatface': return null
    }
  })(),
  disabledPersistentSessions: true, // TODO: Temporary measure for web-464
  idleTimeoutMinutes: 15,
}
