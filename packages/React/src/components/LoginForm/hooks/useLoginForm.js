import { useState } from 'react'
import { useUsersDispatch } from 'hooks/users'

const useLoginForm = () => {
  const [email, setEmail] = useState(Config.devOnlyToolsEnabled ? Config.devDefaultUser : '')
  const [password, setPassword] = useState(Config.devOnlyToolsEnabled ? 'BinkWeb01' : '')

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
