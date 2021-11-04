export const useContactSupport = () => {
  const contactSupport = () => {
    const win = window.open(Config.urls.support, '_blank')
    win.focus()
  }
  return {
    contactSupport,
  }
}
