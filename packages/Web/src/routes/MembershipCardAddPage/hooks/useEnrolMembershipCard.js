import { useState } from 'react'

const useEnrolMembershipCard = () => {
  const [isEnrolMembershipCardModalOpen, setEnrolMembershipCardModalOpen] = useState(false)
  return {
    isEnrolMembershipCardModalOpen,
    setEnrolMembershipCardModalOpen,
  }
}

export default useEnrolMembershipCard
