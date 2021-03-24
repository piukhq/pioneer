module.exports = {
  apiUrl: 'https://api.gb.bink.com',
  env: 'production',
  membershipPlanId: (() => {
    // note: if overwritten then all cases must be kept
    switch (process.env.THEME) {
      case 'bink': return null
      case 'wasabi': return 215
    }
  })(),
}
