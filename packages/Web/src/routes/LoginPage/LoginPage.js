import React from 'react'
import { useSelector } from 'react-redux'
import cx from 'classnames'
import LoginForm from 'components/LoginForm'
import LoadingIndicator from 'components/LoadingIndicator'
import RequestMagicLink from 'components/RequestMagicLink'
import Button from 'components/Button'
import styles from './LoginPage.module.scss'
import useDebugLogin from './hooks/useDebugLogin'

const LoginPage = () => {
  const loading = useSelector(state => state.users.authentication.loading)

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
        <LoadingIndicator />
      ) }
    </div>
  )
}

export default LoginPage
