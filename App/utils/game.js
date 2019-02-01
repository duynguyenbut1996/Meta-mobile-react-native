import MLBBIcons from '../Themes/MLBB'

export const MOBILE_LEGENDS = 'mlbb'
export const DOTA2 = 'dota2'
export const SELECT_GAME = 'select_game'
export const CREATE_TEAM = 'create_team'
export const ranks = {
  mlbb: [
    'Warrior III',
    'Warrior II',
    'Warrior I',
    'Elite III',
    'Elite II',
    'Elite I',
    'Master IV',
    'Master III',
    'Master II',
    'Master I',
    'Grandmaster V',
    'Grandmaster IV',
    'Grandmaster III',
    'Grandmaster II',
    'Grandmaster I',
    'Epic V',
    'Epic IV',
    'Epic III',
    'Epic II',
    'Epic I',
    'Legend V',
    'Legend IV',
    'Legend III',
    'Legend II',
    'Legend I',
    'Mythic',
    'Glorious Mythic',
  ],
}

export const getMLBBRankIcon = rank => {
  if (rank === 'Glorious Mythic' || rank === 'Mythic') {
    return MLBBIcons.rank['mythic']
  }
  const rankPart = rank.split(' ')[0]
  return MLBBIcons.rank[rankPart.toLowerCase()]
}
