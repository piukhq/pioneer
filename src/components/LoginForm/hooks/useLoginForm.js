import { useState } from 'react'
import { useUsersDispatch } from 'hooks/users'

const useLoginForm = () => {
  // todo: to remove default values for username and password
  const [email, setEmail] = useState('bink_web_user_1@bink.com')
  const [password, setPassword] = useState('BinkWeb01')

  const { login } = useUsersDispatch()
  const submit = () => login(email, password)
  return {
    email,
    setEmail,
    password,
    setPassword,
    submit,
  }
}

export default useLoginForm
