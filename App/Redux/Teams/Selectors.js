import { path } from 'ramda'

/* ------------- Selectors ------------- */

export const TeamsSelectors = {
  // TODO: add single game getter
  selectGameTeamProfiles: (state, game, teamIds = []) => {
    if (typeof teamIds === 'string') {
      teamIds = [teamIds]
    }
    return teamIds.map(id => path(['teams', game, id], state)).filter(t => t)
  },
  selectSuccess: state => state.teams.success,
}
