import { useEffect } from 'react'

const useModalSetup = () => {
  useEffect(() => {
    document.getElementsByTagName('html')[0].classList.add('modal--no-scroll')
    return () => {
      document.getElementsByTagName('html')[0].classList.remove('modal--no-scroll')
    }
  }, [])
}

export default useModalSetup
