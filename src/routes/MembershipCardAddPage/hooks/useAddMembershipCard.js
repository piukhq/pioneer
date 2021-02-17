import { useState } from 'react'

const useAddMembershipCard = () => {
  const [isAddMembershipCardModalOpen, setAddMembershipCardModalOpen] = useState(false)
  return {
    isAddMembershipCardModalOpen,
    setAddMembershipCardModalOpen,
  }
}

export default useAddMembershipCard
