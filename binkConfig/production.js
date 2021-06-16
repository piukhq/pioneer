module.exports = {
  apiUrl: 'https://api.gb.bink.com',
  env: 'production',
  membershipPlanId: (() => {
    // note: if overwritten then all cases must be kept
    switch (process.env.THEME) {
      case 'bink': return null
      case 'wasabi': return 215
      case 'fatface': {
        // todo: replace with a `return <number>` once we have the plan id in production
        throw new Error('Config is missing memebershipPlanId for production environment')
      }
    }
  })(),
  supportDebugLogin: false,
  spreedlyEnvironmentKey: '1Lf7DiKgkcx5Anw7QxWdDxaKtTa',
}
