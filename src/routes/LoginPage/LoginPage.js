import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import cx from 'classnames'
import LoginForm from 'components/LoginForm'
import Loading from 'components/Loading'
import RequestMagicLink from 'components/RequestMagicLink'
import Button from 'components/Button'
import styles from './LoginPage.module.scss'
import useDebugLogin from './hooks/useDebugLogin'

const LoginPage = () => {
  const history = useHistory()
  const apiKey = useSelector(state => state.users.authentication.api_key)
  const loading = useSelector(state => state.users.authentication.loading)
  useEffect(() => {
    if (apiKey) {
      history.replace('/')
    }
  }, [apiKey, history])

  const {
    debugLogin,
    hideDebugLogin,
  } = useDebugLogin()

  return (
    <div>
      <RequestMagicLink />
      { debugLogin && (
        <>
          <div className={cx('dev-only', styles['root__debug-login'])}>
            <LoginForm />
            <br /><br />
            <Button tertiary onClick={hideDebugLogin}>Hide debug login component</Button>
          </div>
        </>
      ) }
      { loading && (
        <Loading />
      ) }
    </div>
  )
}

export default LoginPage
