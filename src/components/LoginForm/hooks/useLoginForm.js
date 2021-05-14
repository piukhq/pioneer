import { useState } from 'react'
import { useUsersDispatch } from 'hooks/users'

const useLoginForm = () => {
  // todo: to remove default values for username and password
  const [email, setEmail] = useState(process.env.NODE_ENV === 'development' ? Config.devDefaultUser : '')
  const [password, setPassword] = useState(process.env.NODE_ENV === 'development' ? 'BinkWeb01' : '')

  const { login } = useUsersDispatch()
  const submit = (event) => {
    event.preventDefault()
    login(email, password)
  }
  return {
    email,
    setEmail,
    password,
    setPassword,
    submit,
  }
}

export default useLoginForm
