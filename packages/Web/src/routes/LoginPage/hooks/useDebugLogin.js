import { useHistory } from 'react-router-dom'
import Config from 'config'

const useDebugLogin = () => {
  const history = useHistory()
  const search = window.location.search
  const uParams = new URLSearchParams(search)
  const queryDebugLogin = uParams.get('debugLogin')
  if (queryDebugLogin === 'true') {
    localStorage.setItem('debugLogin', 'true')
  }
  const debugLogin = Config.devOnlyToolsEnabled && localStorage.getItem('debugLogin')
  const hideDebugLogin = () => {
    localStorage.removeItem('debugLogin')
    history.replace('/')
  }

  console.log(Config.devOnlyToolsEnabled, 'dev only tools enabled.')

  return {
    debugLogin,
    hideDebugLogin,
  }
}

export default useDebugLogin
