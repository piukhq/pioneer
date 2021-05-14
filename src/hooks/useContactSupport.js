import Config from 'Config'

const useContactSupport = () => {
  const contactSupport = () => {
    const win = window.open(Config.urls.support, '_blank')
    win.focus()
  }
  return {
    contactSupport,
  }
}

export default useContactSupport
