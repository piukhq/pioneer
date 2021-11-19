import { getMembershipPlans } from 'api/membershipPlans'
import { createSelector } from 'reselect'

export const types = {
  MEMBERSHIP_PLANS_REQUEST: 'membershipPlans/MEMBERSHIP_PLANS_REQUEST',
  MEMBERSHIP_PLANS_SUCCESS: 'membershipPlans/MEMBERSHIP_PLANS_SUCCESS',
  MEMBERSHIP_PLANS_FAILURE: 'membershipPlans/MEMBERSHIP_PLANS_FAILURE',
}

const initialState = {
  loading: false,
  error: false,
  plans: {},
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.MEMBERSHIP_PLANS_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
      }
    case types.MEMBERSHIP_PLANS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        plans: action.payload.reduce((acc, plan) => { acc[plan.id] = plan; return acc }, {}),
      }
    case types.MEMBERSHIP_PLANS_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        plans: {},
      }
    default:
      return state
  }
}

export default reducer

const membershipPlansSelector = state => state.membershipPlans.plans
export const selectors = {
  plansList: createSelector(
    membershipPlansSelector,
    plansObject => Object.keys(plansObject).map(planId => plansObject[planId]),
  ),
}

export const actions = {
  getMembershipPlansRequest: () => ({ type: types.MEMBERSHIP_PLANS_REQUEST }),
  getMembershipPlansFailure: () => ({ type: types.MEMBERSHIP_PLANS_FAILURE }),
  getMembershipPlansSuccess: (payload) => ({ type: types.MEMBERSHIP_PLANS_SUCCESS, payload }),
  getMembershipPlans: () => async (dispatch, getState) => {
    dispatch(actions.getMembershipPlansRequest())
    try {
      const response = await getMembershipPlans()
      dispatch(actions.getMembershipPlansSuccess(response.data))
    } catch (e) {
      dispatch(actions.getMembershipPlansFailure())
    }
  },
}
