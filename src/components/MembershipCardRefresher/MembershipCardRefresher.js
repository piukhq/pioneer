import useMembershipCardRefresher from './hooks/useMembershipCardRefresher'

const MembershipCardRefresher = ({ membershipCardId }) => {
  useMembershipCardRefresher(membershipCardId)

  return null
}

export default MembershipCardRefresher
