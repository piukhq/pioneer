import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useUsersDispatch } from 'hooks/users'

const useLoginForm = () => {
  const history = useHistory()
  const [email, setEmail] = useState(Config.devOnlyToolsEnabled ? Config.devDefaultUser : '')
  const [password, setPassword] = useState(Config.devOnlyToolsEnabled ? 'BinkWeb01' : '')

  const { login } = useUsersDispatch()
  const submit = async (event) => {
    event.preventDefault()
    await login(email, password)
    history.push('/')
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
